const Commerce = require('../models/commerce');
const Employee = require('../models/employee');
const Publication = require('../models/publication'); // 👈 nuevo
const { sendCommerceWelcome, sendRejectedNoticeCommerce, sendAdmittedNoticeCommerce } = require('../services/emailSender');
const { uploadCommerceImage } = require('../services/s3Service');
const { processImage } = require('../helpers/imageHelper');

exports.createCommerce = async (req, res) => {
    try {
        const { image_url, image_name, ...commerceData } = req.body;
        const { buffer, contentType, filename } = processImage(image_url, image_name);

        const imageUrl = await uploadCommerceImage(buffer, contentType, filename);
        commerceData.image_url = imageUrl;

        const commerce = await Commerce.create(commerceData);
        await sendCommerceWelcome(commerceData);
        res.status(201).json(commerce);
    } catch (error) {
        console.error('Error creating Commerce:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findAllCommerces = async (req, res) => {
    try {
        const commerces = await Commerce.findAllCommerces();
        res.status(200).json(commerces);
    } catch (error) {
        console.error('Error fetching Commerces:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findCommerceById = async (req, res) => {
    try {
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error fetching Commerce by ID:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.updateCommerce = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        await commerce.update(body);
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error updating Commerce:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.changeCommerceStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        let commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        commerce.status = status;
        await commerce.save();

        let employeeAdmin = await Employee.findAdminEmployeeByCommerceId(id);
        if (!employeeAdmin) {
            return res.status(404).json({ error: 'Employee not found with id: ' + id });
        }

        switch (status) {
            case 'admitted':
                sendAdmittedNoticeCommerce(employeeAdmin);
                break;
            case 'rejected':
                sendRejectedNoticeCommerce(employeeAdmin);
                break;
            default:
                break;
        }

        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error updating Commerce:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.activateCommerce = async (req, res) => {
    try {
        const { id } = req.params;
        let commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        commerce.is_active == true ? commerce.is_active = false : commerce.is_active = true;
        await commerce.save();
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error updating Commerce:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.deleteCommerce = async (req, res) => {
    try {
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        await commerce.destroy();
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error deleting Commerce:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findCommercesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const commerces = await Commerce.findCommercesByCategoryId(categoryId);
        if (!commerces) {
            return res.status(404).json({ message: 'No commerces found for this category.' });
        }
        res.status(200).json(commerces);
    } catch (error) {
        console.error('Error fetching Commerces by Category ID:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

// 🔎 NUEVO: búsqueda con filtros (código postal / publicaciones próximas a vencer)
exports.searchCommerces = async (req, res) => {
    try {
        const { postal_code, expiring_publications } = req.query;

        const hasPostalCode = !!postal_code;
        const hasExpiring = expiring_publications === 'true';

        if (!hasPostalCode && !hasExpiring) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'At least one filter must be provided: postal_code or expiring_publications=true',
            });
        }

        let commerces;

        if (hasExpiring) {
            // Filtro: publicaciones activas que vencen hoy (opcionalmente en un CP)
            commerces = await Publication.findCommercesWithExpiringPublications({
                postalCode: hasPostalCode ? postal_code : null,
            });
        } else if (hasPostalCode) {
            // Solo por código postal (sin tener en cuenta publicaciones)
            commerces = await Commerce.findCommercesByPostalCode(postal_code);
        }

        if (!commerces || commerces.length === 0) {
            return res.status(404).json({ message: 'No commerces found for given filters.' });
        }

        res.status(200).json(commerces);
    } catch (error) {
        console.error('Error searching Commerces with filters:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};
