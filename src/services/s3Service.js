const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

exports.uploadImage = async (buffer, contentType, filename) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `commerce-products/${filename}`,
    Body: buffer,
    ContentType: contentType,
    ACL: 'public-read',
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/commerce-products/${filename}`;
};