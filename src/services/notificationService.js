const { SNSClient, CreatePlatformEndpointCommand, PublishCommand } = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

exports.createEndpoint = async (deviceToken) => {
  const params = {
    PlatformApplicationArn: process.env.PLARFORM_APPLICATION_ARN,
    Token: deviceToken,
  };

  try {
    const { EndpointArn } = await snsClient.send(new CreatePlatformEndpointCommand(params));
    console.log('Endpoint creado:', EndpointArn);
    return EndpointArn;
  } catch (error) {
    console.error('Error creando el endpoint:', error);
  }
}

exports.sendPushNotification = async (endpointArn, message) => {
  const params = {
    Message: JSON.stringify({
      default: message, // Mensaje genérico
      APNS: `{"aps":{"alert":"${message}","sound":"default"}}`,
      GCM: `{"notification":{"title":"Notificación","body":"${message}"}}`,
    }),
    MessageStructure: 'json',
    TargetArn: endpointArn,
  };

  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log('Notificación enviada:', data);
  } catch (error) {
    console.error('Error enviando notificación:', error);
  }
}