const Publication = require('../models/publication');

const createPublication = async (req, res) => {
    try {
        const { body } = req;
        const publication = new Publication(body);
        await publication.save();
        return res.status(201).json(publication);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllPublications = async (req, res) => {
    try {
        const publications = await Publication.findAll()
        return res.status(200).json(publications);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findByPk(id);
        if (!publication) {
            return res.status(404).json({ error: 'Publication not found with id:' + id });
        }
        return res.status(200).json(publication);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updatePublication = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const publication = await Publication.findByPk(id);
        if (!publication) {
            return res.status(404).json({ error: 'Publication not found with id:' + id });
        }
        await publication.update(body);
        return res.status(201).json(publication);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await publication.findByPk(id);
        if (!publication) {
            return res.status(404).json({ error: 'Publication not found with id:' + id });
        }
        await publication.destroy()
        return res.status(200).json(publication);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createPublication, updatePublication, deletePublication, findAllPublications, findPublicationById};