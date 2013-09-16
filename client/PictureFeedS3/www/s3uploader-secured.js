var s3Uploader = (function () {

    var signingURI = "http://192.168.1.8:3000/signing";

    function upload(imageURI, fileName) {

        var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;

        $.ajax({url: signingURI, data: {"fileName": fileName}, dataType: "json", type: "POST"})
            .done(function (data) {
                options.params = {
                    "key": fileName,
                    "AWSAccessKeyId": data.awsKey,
                    "acl": "public-read",
                    "policy": data.policy,
                    "signature": data.signature,
                    "Content-Type": "image/jpeg"
                };

                ft.upload(imageURI, "https://" + data.bucket + ".s3.amazonaws.com/",
                    function (e) {
                        deferred.resolve(e);
                    },
                    function (e) {
                        alert("Upload failed");
                        deferred.reject(e);
                    }, options);

            })
            .fail(function (error) {
                console.log(JSON.stringify(error));
            });

        return deferred.promise();

    }

    return {
        upload: upload
    }

}());