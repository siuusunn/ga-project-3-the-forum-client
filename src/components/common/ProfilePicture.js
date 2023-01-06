import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';

export default function ProfilePicture({
  cloudinaryImageId,
  imageWidth,
  imageHeight
}) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    }
  });

  const myImage = cld.image(cloudinaryImageId);

  myImage
    .resize(
      thumbnail()
        .width(imageWidth)
        .height(imageHeight)
        .gravity(focusOn(FocusOn.face()))
    ) // Crop the image, focusing on the face.
    .roundCorners(byRadius(50));

  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}
