


exports.processImage = (image) => {
    const buffer = Buffer.from(image.preview.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const contentType = image.preview.split(';')[0].split('/')[1];
    const filename = Date.now().toString() + '-' + image.path.replace(/\s+/g, '').toLowerCase();
  
    return { buffer, contentType, filename };
};
    