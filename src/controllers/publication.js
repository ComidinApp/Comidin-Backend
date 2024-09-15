const Publication = require('../models/publication');

exports.createPublication = async (req, res) => {
  try {
    const { body } = req;
    const publication = await Publication.create(body);
    res.status(201).json(publication);
  } catch (error) {
    console.error('Error creating Publication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllPublications = async (req, res) => {
  try {
    const publications = await Publication.findAllPublications();
    res.status(200).json(publications);
  } catch (error) {
    console.error('Error fetching Publications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findPublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByPk(id);
    if (publication) {
      res.status(200).json(publication);
    } else {
      res.status(404).json({ error: `Publication not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching Publication by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const publication = await Publication.findByPk(id);
    if (publication) {
      await publication.update(body);
      res.status(200).json(publication);
    } else {
      res.status(404).json({ error: `Publication not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating Publication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByPk(id);
    if (publication) {
      await publication.destroy();
      res.status(200).json({ message: 'Publication successfully deleted' });
    } else {
      res.status(404).json({ error: `Publication not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting Publication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findPublicationsByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const publications = await Publication.findPublicationsByCommerceId(commerceId);
    if (publications && publications.length > 0) {
      res.status(200).json(publications);
    } else {
      res.status(404).json({ message: 'No publications found for this commerce.' });
    }
  } catch (error) {
    console.error('Error fetching Publications by Commerce ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
