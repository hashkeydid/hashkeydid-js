import * as metadata from "../metadata.js"

metadata.GetMetadata(15921).then( meta => {
    console.log(meta);
});

metadata.GetMetadataImage(15921).then( meta => {
    console.log(meta);
});

metadata.GetMetadataName(15921).then( meta => {
    console.log(meta);
});

metadata.GetMetadataDescription(15921).then( meta => {
    console.log(meta);
});
