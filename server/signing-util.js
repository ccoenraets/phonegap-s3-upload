var crypto = require('crypto'),
    secret = "YOUR_AWS_USER_SECRET",
    policy,
    policyBase64,
    signature;

policy = {
    "expiration": "2020-12-31T12:00:00.000Z",
    "conditions": [
        {"bucket": "YOUR_AWS_BUCKET_NAME"},
        ["starts-with", "$key", ""],
        {"acl": 'public-read'},
        ["starts-with", "$Content-Type", ""],
        ["content-length-range", 0, 524288000]
    ]
};

policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
console.log("Policy Base64:");
console.log(policyBase64);

signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');
console.log("Signature:");
console.log(signature);