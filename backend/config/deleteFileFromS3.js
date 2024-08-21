const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Delete a file from S3
 * @param {string} fileName - The name of the file to be deleted from S3
 * @returns {Promise} - Resolves if successful, rejects if there's an error
 */
const deleteFileFromS3 = async (fileName) => {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
    };

    try {
        const command = new DeleteObjectCommand(deleteParams);
        await s3.send(command);
        console.log(`Successfully deleted ${fileName} from S3.`);
    } catch (error) {
        console.error(`Error deleting file from S3: ${error.message}`);
        throw new Error(`Could not delete file from S3: ${error.message}`);
    }
};

module.exports = deleteFileFromS3;
