// controllers/publication.js
const Publication = require('../models/publication');

exports.createPublication = async (req, res) => {
  try {
    const { body } = req;
    console.log('[Publication] Payload recibido en createPublication:', body);

    const publication = await Publication.create(body);
    console.log('[Publication] Creada correctamente con id:', publication.id);

    return res.status(201).json(publication);
  } catch (error) {
    console.error('Error creating Publication:', error);
    return res.status(409).json({
      error: 'Conflict',
      message: error.message || 'Error al crear la publicación',
    });
  }
};

exports.findAllPublications = async (_req, res) => {
  try {
    const publications = await Publication.findAllPublications();
    return res.status(200).json(publications);
  } catch (error) {
    console.error('Error fetching Publications:', error);
    return res.status(409).json({
      error: 'Conflict',
      message: error.message || 'Error al obtener las publicaciones',
    });
  }
};

exports.findPublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByPk(id);

    if (!publication) {
      return res.status(404).json({ error: `Publication not found with id: ${id}` });
    }

    return res.status(200).json(publication);
  } catch (error) {
    console.error('Error fetching Publication by ID:', error);
    return res.status(409).json({
      error: 'Conflict',
      message: error.message || 'Error al obtener la publicación',
    });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const publication = await Publication.findByPk(id);

    if (!publication) {
      return res.status(404).json({ error: `Publication not found with id: ${id}` });
    }

    await publication.update(body);
    console.log('[Publication] Actualizada publicación id:', id);

    return res.status(200).json(publication);
  } catch (error) {
    console.error('Error updating Publication:', error);
    return res.status(409).json({
      error: 'Conflict',
      message: error.message || 'Error al actualizar la publicación',
    });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const { id } = req.params;

    const publication = await Publication.findByPk(id);
    if (!publication) {
      return res.status(404).json({ error: `Publication not found with id: ${id}` });
    }

    await publication.destroy();
    console.log('[Publication] Eliminada publicación id:', id);

    return res.status(200).json({ message: 'Publication successfully deleted' });
  } catch (error) {
    console.error('Error deleting Publication:', error);
    return res.status(409).json({
      error: 'Conflict',
      message: error.message || 'Error al eliminar la publicación',
    });
  }
};

exports.findPublicationsByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const publications = await Publication.findPublicationsByCommerceId(commerceId);

    if (!publications || publications.length === 0) {
      return res.status(404).json({ message: 'No publications found for this commerce.' });
    }

    return res.status(200).json(publications);
  } catch (error) {
    console.error('Error fetching Publications by Commerce ID:', error);
    return res.status(409).json({
      error: 'Conflict',
      message: error.message || 'Error al obtener las publicaciones por comercio',
    });
  }
};
