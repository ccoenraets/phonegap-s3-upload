var s3Uploader = (function () {

    var s3URI = encodeURI("https://YOUR_S3_BUCKET_NAME.s3.amazonaws.com/"),
        policyBase64 = "YOUR_BASE64_ENCODED_POLICY_FILE",
        signature = "YOUR_BASE64_ENCODED_SIGNATURE",
        awsKey = 'YOUR_AWS_USER_KEY',
        acl = "public-read";

    function upload(imageURI, fileName) {

        var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            "key": fileName,
            "AWSAccessKeyId": awsKey,
            "acl": acl,
            "policy": policyBase64,
            "signature": signature,
            "Content-Type": "image/jpeg"
        };

        ft.upload(imageURI, s3URI,
            function (e) {
                deferred.resolve(e);
            },
            function (e) {
                deferred.reject(e);
            }, options);

        return deferred.promise();

    }

    return {
        upload: upload
    }

}());