import * as avatar from "../avatar.js"

avatar.GetMetadataAvatarByDIDName('herro.key').then (
    res => {
        console.log(res);
    }
);

avatar.GetMetadataAvatarByTokenId(13756).then (
    res => {
        console.log(res);
    }
);

avatar.GetAvatarByDIDName('herro.key').then (
    res => {
        console.log(res);
    }
);

avatar.GetAvatarByTokenId(13756).then (
    res => {
        console.log(res);
    }
);