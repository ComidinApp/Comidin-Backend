


exports.processImage = (base64,image_name) => {
    const buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const contentType = base64.split(';')[0].split('/')[1];
    const filename = Date.now().toString() + '-' + image_name.replace(/\s+/g, '').toLowerCase();
  
    return { buffer, contentType, filename };
};
    