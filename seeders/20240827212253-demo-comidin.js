'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
 
    await queryInterface.bulkInsert('user', [
      {
        first_name: 'Fran',
        last_name:'Somoza',
        email:'fran@hotmail.com',
        phone_number:'99998999',
        national_id:'999799',
        is_active: true,
        password:'Fran@test1',
        birthday:'2000-05-04',
        created_at: new Date()
      },
      {
        first_name: 'Juan',
        last_name:'Donalisio',
        email:'juan@hotmail.com',
        phone_number:'99979999',
        national_id:'996999',
        is_active: true,
        password:'Juan@test1',
        birthday:'2000-05-04',
        created_at: new Date()
      },
      {
        first_name: 'Flor',
        last_name:'Farace',
        email:'flor@hotmail.com',
        phone_number:'95999999',
        national_id:'999499',
        is_active: true,
        password:'Flor@test1',
        birthday:'2000-05-04',
        created_at: new Date()
      },
      {
        first_name: 'Tato',
        last_name:'Cargnelutti',
        email:'tato@hotmail.com',
        phone_number:'932999999',
        national_id:'9991999',
        is_active: true,
        password:'Tato@test1',
        birthday:'2000-05-04',
        created_at: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('commerce_category', [
      {
      name: 'Panaderia',
      description: 'Se encargan de la elaboracion de productos que te alegran la tarde con matecitos :)'
      },
      {
      name: 'Carniceria',
      description: 'Se encargan de la comercializacion de carnecita'
      },
      {
      name: 'Pancheria',
      description: 'Se encargan de la comercializacion de panchitos :)'
      },      
    ], {});

    await queryInterface.bulkInsert('commerce', [
      {
        name: 'La Celeste',
        commerce_category_id: 1 ,//Aqui iria el id del commerceCategory que cree en el paso anterior
        street_name: 'Av. 9 de Mayo',
        number:'1234',
        postal_code: '5020',
        commerce_national_id: '123',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      },
      {
        name: 'Carnes Argentinas',
        commerce_category_id: 2 ,//Aqui iria el id del commerceCategory que cree en el paso anterior
        street_name: 'Savedra',
        number:'139',
        postal_code: '5020',
        commerce_national_id: '1233',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      },
      {
        name: 'Pancho Roldan',
        commerce_category_id: 3 ,//Aqui iria el id del commerceCategory que cree en el paso anterior
        street_name: 'Achaval Rodriguez',
        number:'99',
        postal_code: '5020',
        commerce_national_id: '1234',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      }
    ], {});

  await queryInterface.bulkInsert('role', [
    {
      name: 'Admin',
      description:'Administrador rol con full acceso, hace todo el loco',
    },
    {
      name: 'Cocinero',
      description:'Te cocina el loco',
    },
    {
      name: 'Delivery',
      description:'Te entrega el pedido el loco',
    }
  ], {});

  await queryInterface.bulkInsert('employee', [
    {
      commerce_id: 3,
      role_id: 1,
      first_name: 'Juan',
      last_name: 'Donalisio',
      email: 'jpdona@hotmail.com',
      phone_number: '123456789',
      national_id: '1',
      address: 'Illia 742',
      postal_code: "1001",
      password: "Juan@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/icecream.png',
      status:'active',
      verification_code: null
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Tato',
      last_name: 'Cargnelutti',
      email: 'cargneluttilautaro@gmail.com',
      phone_number: '122456789',
      national_id: '2',
      address: 'Mi direccion real 123',
      postal_code: "1001",
      password: "Tato@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/fries.png',
      status:'active',
      verification_code: null
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Fran',
      last_name: 'Somoza',
      email: 'fran.s300@hotmail.com',
      phone_number: '122256789',
      national_id: '3',
      address: 'San Martin 3212',
      postal_code: "1001",
      password: "Fran@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/bread.png',
      status:'active',
      verification_code: null
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Flor',
      last_name: 'Farace',
      email: ' faraceflorencia@gmail.com',
      phone_number: '122356789',
      national_id: '4',
      address: 'Av rafael nuñez 333',
      postal_code: "1001",
      password: "Flor@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/pizza.png',
      status:'active',
      verification_code: null
    },
    {
      commerce_id: 3,
      role_id: 3,
      first_name: 'Cecilia',
      last_name: 'Tretel',
      email: 'ceci.perez@gmail.com',
      phone_number: '122456689',
      national_id: '5',
      address: 'Gato y mancha 2231',
      postal_code: "1001",
      password: "Ceci@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/coffe.png',
      status:'active',
      verification_code: null
    },

  ], {});

  await queryInterface.bulkInsert('address', [
    {
      user_id: 1,
      street_name: 'Enfermera Clermont',
      number: '377',
      postal_code: '5000',
      home_type: 'Apartment',
      extra_info: 'Cerca de cancha de Belgrano',
      home_referral_name: 'Unico edificio',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },
    {
      user_id: 2,
      street_name: 'Achaval Rodriguez',
      number: '12',
      postal_code: '5000',
      home_type: 'House',
      extra_info: 'Casa roja',
      home_referral_name: 'La rosita',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },
    {
      user_id: 3,
      street_name: 'Estrada',
      number: '123678',
      postal_code: '5000',
      home_type: 'House',
      extra_info: 'Arriba de Pet Shop',
      home_referral_name: 'La peque',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },
    {
      user_id: 4,
      street_name: 'Juan manuel Estrada',
      number: '1234',
      postal_code: '5000',
      home_type: 'Apartment',
      extra_info: 'Cerca de plaza españa',
      home_referral_name: '5H',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },


  ], {});

  await queryInterface.bulkInsert('plan', [
    {
      name: 'Premium',
      description: 'Contiene publicaciones ilimitadas, mayor exposicion y accesos a estadisticas unicas' 
    },
    {
      name: 'Clasic',
      description: 'Contiene publicaciones ilimitadas y mayor exposicion' 
    },
    {
      name: 'Basic',
      description: 'Contiene unicamente publicaciones ilimitadas' 
    }
  ], {});

  await queryInterface.bulkInsert('product_category', [
    {
      commerce_id: 1,
      name: 'Postre',
      description: 'Abarca tortas y dulces' 
    },
    {
      commerce_id: 1,
      name: 'Panificacion',
      description: 'Panes, criollos, facturas y grisines' 
    },
    {
      commerce_id: 2,
      name: 'Carnes envasadas',
      description: 'Carnes para consumir en el acto' 
    },
    {
      commerce_id: 2,
      name: 'Carnes fresca',
      description: 'Carne sin evasado' 
    },
    {
      commerce_id: 3,
      name: 'Frito',
      description: 'Hecho con aceite como papas fritas' 
    },
    {
      commerce_id: 3,
      name: 'Hervidos',
      description: 'salchichaz, huevos, etc' 
    }
  ], {});

  await queryInterface.bulkInsert('product', [
    {
      commerce_id: 1,
      name: 'Baguete',
      description: 'Esto es la descripcion para el baguete',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/baguete-laceleste.jpeg',
      product_code:'432',
      product_category_id:1,
      created_at: new Date()

    },
    {
      commerce_id: 1,
      name: 'Criollo Hojaldre',
      description: 'Esto es la descripcion para el criollo de hojaldre',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/criollodehojalre-laceleste.jpg',
      product_code:'123',
      product_category_id:2,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Hamburguesa de guacamole',
      description: 'El señor de la nooooocheeeee',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/hamburguesaguacamole-panchoroldan.jpg',
      product_code:'321',
      product_category_id:3,
      created_at: new Date()
    },
    {
      commerce_id: 1,
      name: 'Medialuna salada',
      description: 'Es salada',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/medialunasalada-laceleste.jpg',
      product_code:'231',
      product_category_id:4,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Super Pancho Rolano',
      description: 'Pancho con salchicha - medio metro bañado en salsa',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/superpancho-panchoroldan.jpg',
      product_code:'312',
      product_category_id:5,
      created_at: new Date()
    }
  ], {});

  await queryInterface.bulkInsert('subscription', [
    {
      commerce_id: 1,
      plan_id: 1,
      created_at: new Date()
    },
    {
      commerce_id: 2,
      plan_id: 2,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      plan_id: 3,
      created_at: new Date()
    }
  ], {});

  await queryInterface.bulkInsert('order', [
    {
      user_id: 1,
      commerce_id: 1,
      created_at: new Date(),
      total_amount:'500',
      status:'Finalizado',
      delivery_type:'Moto'
    },
    {
      user_id: 2,
      commerce_id: 2,
      created_at: new Date(),
      total_amount:'1000',
      status:'Finalizado',
      delivery_type:'Bici'
    },
    {
      user_id: 3,
      commerce_id: 3,
      created_at: new Date(),
      total_amount:'4000',
      status:'Finalizado',
      delivery_type:'Auto'
    }
  ], {});

  await queryInterface.bulkInsert('rating', [
    {
      user_id: 1,
      commerce_id: 1,
      order_id:1,
      rate_order:'5'
    },
    {
      user_id: 2,
      commerce_id: 2,
      order_id:2,
      rate_order:'7'
    },
    {
      user_id: 3,
      commerce_id: 3,
      order_id:3,
      rate_order:'10'
    }
  ], {});

    await queryInterface.bulkInsert('customer_complain', [
    {
      user_id: 1,
      commerce_id: 1,
      order_id:1,
      complain_description:'El pedido llego tarde',
      created_at: new Date(),
      closed_at: new Date()
    },
    {
      user_id: 2,
      commerce_id: 2,
      order_id:2,
      complain_description:'Me llego el rpoducto incorrecto',
      created_at: new Date(),
      closed_at: new Date()
    },
    {
      user_id: 3,
      commerce_id: 3,
      order_id:3,
      complain_description:'Nunca llego mi producto',
      created_at: new Date(),
      closed_at: new Date()
    }
  ], {});

  await queryInterface.bulkInsert('publication', [
    {
      available_stock: 120,
      price: 3000,
      discounted_price: 3000,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:1,
      product_id: 2,
      created_at: new Date(),
      price:'100',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 200,
      price: 3000,
      is_active: 'active',
      discounted_price: 3000,
      discount_percentaje: 0,
      commerce_id:2,
      product_id: 4,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 3000,
      is_active: 'active',
      discounted_price: 3000,
      discount_percentaje: 0,
      commerce_id:3,
      product_id: 3,
      created_at: new Date(),
      price:'100',
      expiration_date:new Date(),
    }
  ], {});

  await queryInterface.bulkInsert('order_detail', [
    {

      order_id:1,
      publication_id: 1,
      created_at: new Date(),
      quantity:'1',
      tips:'1',
      amount:'100'
    },
    {
      order_id:2,
      publication_id: 2,
      created_at: new Date(),
      quantity:'1',
      tips:'1',
      amount:'300'
    },
    {
      order_id:3,
      publication_id: 3,
      created_at: new Date(),
      quantity:'1',
      tips:'1',
      amount:'100'
    }
  ], {});


  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
