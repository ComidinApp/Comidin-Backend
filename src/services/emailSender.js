const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationCode = async (employee, verificationCode) => {
  try {
    const fullname = `${employee.first_name} ${employee.last_name}`;

    const msg = {
      to: employee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_VERIFICATION_CODE,
      dynamic_template_data: {
        code: verificationCode,
        employee_name: fullname,
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar código de verificación:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

exports.sendEmployeeWelcome = async (employee, temporaryPassword) => {
  try {
    const msg = {
      to: employee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_EMPLOYEE_WELCOME,
      dynamic_template_data: {
        userName: employee.first_name || 'Hola',
        contactMail: 'soporte@comidin.com.ar',
        temporaryPassword: temporaryPassword,
        loginUrl: process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/login` : 'https://comidin.com.ar/login',
      },
    };

    await sgMail.send(msg);
    console.log('Email bienvenida empleado enviado:', { to: employee.email });
  } catch (error) {
    console.error('Error al enviar bienvenida empleado (SendGrid):', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};

exports.sendAdmittedNoticeCommerce = async (adminEmployee) => {
  try {
    const msg = {
      to: adminEmployee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_CONFIRMED_COMMERCE,
      dynamic_template_data: {
        commerceName: adminEmployee?.commerce?.name || 'tu comercio',
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mensaje de admisión a comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

exports.sendRejectedNoticeCommerce = async (adminEmployee) => {
  try {
    const msg = {
      to: adminEmployee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_REJECTED_COMMERCE,
      dynamic_template_data: {
        commerceName: adminEmployee?.commerce?.name || 'tu comercio',
        contactMail: 'contactoar@comidin.com.ar',
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mensaje de rechazo al comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

exports.sendCustomerComplainCommerceToEmployees = async ({ order, user, commerce, employees, complain }) => {
  try {
    const templateId =
      process.env.SENDGRID_ORDER_COMPLAIN_COMMERCE ||
      process.env.SENDGRID_CUSTOMER_COMPLAIN_COMMERCE;

    if (!templateId) {
      throw new Error(
        'Missing env var: SENDGRID_ORDER_COMPLAIN_COMMERCE or SENDGRID_CUSTOMER_COMPLAIN_COMMERCE'
      );
    }

    const recipients = (employees || [])
      .map(e => (e?.email || '').trim())
      .filter(email => email && email.includes('@'));

    const uniqueRecipients = [...new Set(recipients)];

    if (uniqueRecipients.length === 0) return;

    const dynamic_template_data = {
      commerceName: commerce?.name || 'tu comercio',
      orderId: order?.id,
      customerName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
      customerEmail: user?.email || '',
      complainDescription: complain?.complain_description || 'Sin descripción',
    };

    for (const to of uniqueRecipients) {
      const msg = {
        to,
        from: 'no-reply@comidin.com.ar',
        templateId,
        dynamic_template_data,
      };

      await sgMail.send(msg);
    }
  } catch (error) {
    console.error('Error al enviar reclamo a empleados del comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
};

exports.sendCustomerComplainCustomer = async ({
  order,
  user,
  commerce,
  complain,
  contactEmployee,
}) => {
  try {
    const templateId =
      process.env.SENDGRID_ORDER_COMPLAIN_CUSTOMER ||
      process.env.SENDGRID_CUSTOMER_COMPLAIN_CUSTOMER;

    if (!templateId) {
      throw new Error(
        'Missing env var: SENDGRID_ORDER_COMPLAIN_CUSTOMER or SENDGRID_CUSTOMER_COMPLAIN_CUSTOMER'
      );
    }

    const to = (user?.email || '').trim();
    if (!to || !to.includes('@')) return;

    const orderItems =
      (order?.order_details || [])
        .map((d) => {
          const name = d?.publication?.product?.name || 'Producto';
          const qty = d?.quantity ?? 1;
          return `${name} x${qty}`;
        })
        .join(', ') || 'Sin detalle de productos';

    const contactName = contactEmployee
      ? `${contactEmployee?.first_name || ''} ${contactEmployee?.last_name || ''}`.trim()
      : (commerce?.name ? `Equipo de ${commerce.name}` : 'Equipo del comercio');

    const contactEmail = (contactEmployee?.email || commerce?.email || '').trim();
    const contactPhone = (contactEmployee?.phone_number || '').trim();

    const complainId = complain?.id;
    if (!complainId) {
      throw new Error('Missing complain.id (needed for satisfaction buttons)');
    }

    const apiBaseUrl = (process.env.API_BASE_URL || 'https://api.comidin.com.ar').replace(/\/$/, '');
    const satisfactionYesUrl = `${apiBaseUrl}/customerComplain/${complainId}/satisfaction?answer=Y`;
    const satisfactionNoUrl = `${apiBaseUrl}/customerComplain/${complainId}/satisfaction?answer=N`;

    const msg = {
      to,
      from: 'no-reply@comidin.com.ar',
      templateId,
      dynamic_template_data: {
        userName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
        orderId: order?.id,
        orderItems,
        reclaimDescription: complain?.complain_description || 'Sin descripción',
        reclaimStartDate: new Date().toLocaleString('es-AR', {
          timeZone: 'America/Argentina/Buenos_Aires',
        }),
        commerceName: commerce?.name || 'el comercio',
        contactName,
        contactEmail,
        contactPhone,
        complainId,
        satisfactionYesUrl,
        satisfactionNoUrl,
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar reclamo al cliente:', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};

exports.sendOrderStatusUpdateCustomer = async ({ orderId, newStatus }) => {
  try {
    const templateId =
      process.env.SENDGRID_ORDER_STATUS || process.env.SENGRID_ORDER_STATUS;

    if (!templateId) {
      throw new Error('Missing env var: SENDGRID_ORDER_STATUS (or SENGRID_ORDER_STATUS)');
    }

    const Order = require('../models/order');
    const orderFull = await Order.findOrderById(orderId);

    if (!orderFull) return;

    const to = (orderFull?.user?.email || '').trim();
    if (!to || !to.includes('@')) return;

    const userName = `${orderFull?.user?.first_name || ''} ${orderFull?.user?.last_name || ''}`.trim() || 'Cliente';

    const normalizedStatus = (newStatus || orderFull?.status || '').toString().trim().toUpperCase();

    const statusTranslations = {
      PENDING: 'Pendiente',
      CONFIRMED: 'Confirmado',
      COMPLETED: 'Completado',
      CANCELLED: 'Cancelado',
      Delivered: 'Entregado',
      CLAIMED: 'Reclamado',
      RESOLVED: 'Resuelto',
    };

    const orderState = statusTranslations[normalizedStatus] || normalizedStatus;

    const details = Array.isArray(orderFull?.order_details) ? orderFull.order_details : [];

    const orderItem =
      details
        .map((d) => {
          const name =
            d?.publication?.product?.name ||
            'Producto';
          const qty = Number(d?.quantity ?? 1);
          return qty > 1 ? `${name} x${qty}` : name;
        })
        .filter(Boolean)
        .join(', ') || 'Sin detalle de productos';

    const quantityItem =
      details.reduce((acc, d) => acc + (Number(d?.quantity) || 0), 0) ||
      Number(orderFull?.items_quantity) ||
      1;

    const addr = orderFull?.address || {};
    const userAddress =
      [addr?.street_name, addr?.number, addr?.postal_code]
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim() || 'Sin dirección informada';

    const msg = {
      to,
      from: 'no-reply@comidin.com.ar',
      templateId,
      dynamic_template_data: {
        userName,
        orderId: orderFull?.id,
        orderState,
        orderItem,
        quantityItem,
        userAddress,
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mail de cambio de estado del pedido:', error);
    if (error.response) console.error(error.response.body);
  }
};

exports.sendNewOrderToCommerceEmployees = async ({ orderId, roleIds = [1, 5, 6] }) => {
  try {
    const templateId = process.env.SENGRID_NEW_ORDER || process.env.SENDGRID_NEW_ORDER;

    if (!templateId) {
      throw new Error('Missing env var: SENGRID_NEW_ORDER (or SENDGRID_NEW_ORDER)');
    }

    const Order = require('../models/order');
    const getEmployeeModel = () => require('../models/employee');

    const orderFull = await Order.findOrderById(orderId);
    if (!orderFull) return;

    const commerceId = orderFull?.commerce_id || orderFull?.commerce?.id;
    if (!commerceId) return;

    const Employee = getEmployeeModel();
    const employees = await Employee.findEmployeesByCommerceIdAndRoleIds(commerceId, roleIds);

    const recipients = (employees || [])
      .map(e => (e?.email || '').trim())
      .filter(email => email && email.includes('@'));

    const uniqueRecipients = [...new Set(recipients)];
    if (uniqueRecipients.length === 0) return;

    const details = Array.isArray(orderFull?.order_details) ? orderFull.order_details : [];
    const orderItems =
      details
        .map((d) => {
          const name = d?.publication?.product?.name || 'Producto';
          const qty = Number(d?.quantity ?? 1);
          return qty > 1 ? `${name} x${qty}` : name;
        })
        .filter(Boolean)
        .join(', ') || 'Sin detalle de productos';

    const quantityItem =
      details.reduce((acc, d) => acc + (Number(d?.quantity) || 0), 0) ||
      Number(orderFull?.items_quantity) ||
      1;

    const totalAmountRaw =
      orderFull?.total_amount ??
      orderFull?.total ??
      orderFull?.total_price ??
      null;

    const totalAmountFallback = details.reduce((acc, d) => {
      const qty = Number(d?.quantity ?? 0) || 0;
      const price =
        Number(d?.price ?? d?.unit_price ?? d?.publication?.discounted_price ?? d?.publication?.price ?? 0) || 0;
      return acc + qty * price;
    }, 0);

    const totalAmountNumber = Number(totalAmountRaw ?? totalAmountFallback ?? 0) || 0;

    const totalAmount = totalAmountNumber.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    const addr = orderFull?.address || {};
    const userAddress =
      [addr?.street_name, addr?.number, addr?.postal_code]
        .filter(Boolean)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim() || 'Sin dirección informada';

    const userName =
      `${orderFull?.user?.first_name || ''} ${orderFull?.user?.last_name || ''}`.trim() ||
      orderFull?.user?.email ||
      'Cliente';

    const payMethod =
      (orderFull?.pay_method || orderFull?.payment_method || orderFull?.payment?.method || 'No informado')
        .toString()
        .trim();

    const commerceName = orderFull?.commerce?.name || 'tu comercio';

    const dynamic_template_data = {
      commerceName,
      orderId: orderFull?.id,
      orderItems,
      quantityItem,
      totalAmount,
      userAddress,
      userName,
      payMethod,
    };

    for (const to of uniqueRecipients) {
      await sgMail.send({
        to,
        from: 'no-reply@comidin.com.ar',
        templateId,
        dynamic_template_data,
      });
    }

    console.log('New order email sent to commerce employees:', {
      orderId: orderFull?.id,
      recipients: uniqueRecipients.length,
    });
  } catch (error) {
    console.error('Error sending new order email to commerce employees:', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};

exports.sendCommerceWelcome = async ({ commerce, toEmail } = {}) => {
  try {
    const templateId = process.env.SENDGRID_COMMERCE_WELCOME;
    if (!templateId) {
      throw new Error('Missing env var: SENDGRID_COMMERCE_WELCOME');
    }

    const to = (toEmail || '').trim();

    if (!to || !to.includes('@')) {
      console.log('Commerce welcome: no recipient email found', {
        commerceId: commerce?.id,
        toEmail,
      });
      return;
    }

    const msg = {
      to,
      from: 'no-reply@comidin.com.ar',
      templateId,
      dynamic_template_data: {
        commerceName: commerce?.name || 'tu comercio',
      },
    };

    await sgMail.send(msg);

    console.log('Commerce welcome email sent:', { commerceId: commerce?.id, to });
  } catch (error) {
    console.error('Error enviando mail de bienvenida al comercio:', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};

/* =========================================================
   ✅ NUEVO: Aviso a ADMINs (role_id = 1) por alta de comercio
   Env: NEW_COMMERCE_REQUEST
   ========================================================= */
exports.sendNewCommerceRequestToAdmins = async ({ commerce, adminEmployees } = {}) => {
  try {
    const templateId = process.env.SENGRID_NEW_COMMERCE_REQUEST;
    if (!templateId) {
      throw new Error('Missing env var: SENGRID_NEW_COMMERCE_REQUEST');
    }

    const recipients = (adminEmployees || [])
      .map((e) => (e?.email || '').trim())
      .filter((email) => email && email.includes('@'));

    const uniqueRecipients = [...new Set(recipients)];

    if (uniqueRecipients.length === 0) {
      console.log('[sendNewCommerceRequestToAdmins] No admin recipients found. Skipping.', {
        commerceId: commerce?.id,
      });
      return;
    }

    // Formatos “humanos”
    const createdAtStr = commerce?.created_at
      ? new Date(commerce.created_at).toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })
      : '';

    const isActiveLabel = commerce?.is_active ? 'Sí' : 'No';

    // Link fijo que pediste
    const adminPanelUrl = 'https://comidin.com.ar/dashboard/commerce';

    // La categoría no está en el modelo base en este controller (create usa Commerce.create directo),
    // así que mandamos vacío salvo que venga ya “hidratado”.
    const commerceCategoryName =
      commerce?.commerceCategory?.name ||
      commerce?.commerce_category?.name ||
      commerce?.category?.name ||
      commerce?.commerceCategoryName ||
      '';

    const dynamic_template_data = {
      commerceId: commerce?.id ?? '',
      commerceName: commerce?.name ?? '',
      commerceCategoryName,
      streetName: commerce?.street_name ?? '',
      streetNumber: commerce?.number ?? '',
      postalCode: commerce?.postal_code ?? '',
      commerceNationalId: commerce?.commerce_national_id ?? '',
      status: commerce?.status ?? 'pending',
      createdAt: createdAtStr,
      openAt: commerce?.open_at ?? '',
      closeAt: commerce?.close_at ?? '',
      availableDays: commerce?.available_days ?? '',
      isActive: isActiveLabel,
      imageUrl: commerce?.image_url ?? '',
      adminPanelUrl,
    };

    for (const to of uniqueRecipients) {
      await sgMail.send({
        to,
        from: 'no-reply@comidin.com.ar',
        templateId,
        dynamic_template_data,
      });
    }

    console.log('[sendNewCommerceRequestToAdmins] Email sent:', {
      commerceId: commerce?.id,
      recipients: uniqueRecipients.length,
    });
  } catch (error) {
    console.error('Error al enviar solicitud de nuevo comercio a admins:', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};


exports.sendOrderCancelledByCommerceCustomer = async ({ orderId }) => {
  try {
    const templateId = process.env.SENGRID_CANCELLED_NOTIFICATION;
    if (!templateId) {
      throw new Error('Missing env var: SENGRID_CANCELLED_NOTIFICATION');
    }

    const Order = require('../models/order');
    const orderFull = await Order.findOrderById(orderId);
    if (!orderFull) return;

    const to = (orderFull?.user?.email || '').trim();
    if (!to || !to.includes('@')) return;

    const userName =
      `${orderFull?.user?.first_name || ''} ${orderFull?.user?.last_name || ''}`.trim() ||
      'Cliente';

    const commerce = orderFull?.commerce || {};
    const commerceName = commerce?.name || 'el comercio';
    const commerceEmail = (commerce?.email || '').trim();
    const commercePhone =
      (commerce?.phone_number || commerce?.phone || '').toString().trim();

    // Detalle de items para que el cliente no flashee que fue "un pedido cualquiera"
    const details = Array.isArray(orderFull?.order_details) ? orderFull.order_details : [];
    const orderItems =
      details
        .map((d) => {
          const name = d?.publication?.product?.name || 'Producto';
          const qty = Number(d?.quantity ?? 1);
          return qty > 1 ? `${name} x${qty}` : name;
        })
        .filter(Boolean)
        .join(', ') || 'Sin detalle de productos';

    const totalAmountRaw =
      orderFull?.total_amount ?? orderFull?.total ?? orderFull?.total_price ?? null;

    const totalAmountFallback = details.reduce((acc, d) => {
      const qty = Number(d?.quantity ?? 0) || 0;
      const price =
        Number(d?.price ?? d?.unit_price ?? d?.publication?.discounted_price ?? d?.publication?.price ?? 0) || 0;
      return acc + qty * price;
    }, 0);

    const totalAmountNumber = Number(totalAmountRaw ?? totalAmountFallback ?? 0) || 0;

    const totalAmount = totalAmountNumber.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });

    const cancelledAt = new Date().toLocaleString('es-AR', {
      timeZone: 'America/Argentina/Buenos_Aires',
    });

    const msg = {
      to,
      from: 'no-reply@comidin.com.ar',
      templateId,
      dynamic_template_data: {
        userName,
        orderId: orderFull?.id,
        cancelledAt,
        commerceName,
        commerceEmail: commerceEmail || 'No informado',
        commercePhone: commercePhone || 'No informado',
        orderItems,
        totalAmount,
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mail de pedido cancelado por el comercio:', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};