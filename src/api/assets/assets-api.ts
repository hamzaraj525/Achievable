import { getApi, parseApiError } from '../api';

export const uploadAsset = async (assetId: number, formData: FormData) => {
  try {
    await (await getApi()).put(`/v1/assets/${assetId}`, formData); // TODO change to PUT /v1/assets
  } catch (error) {
    throw parseApiError(error);
  }
};

// TODO instead of creating asset through task completion api, create through this api instead
// export const createAsset = async (assetPayload: {
//   assetSource: AssetSourceTypes;
//   associatedSourceId: number;
//   assetName?: string;
//   assetExtension?: string;
//   image?: File;
//   assetUri?: string;
// }) => {
//   // formData expects image
//   const image = assetPayload.image;

//   const formData = Object.keys(assetPayload).reduce(
//     (nextFormData: FormData, key: string) => {
//       if (key === 'image' && image) {
//         nextFormData.append(
//           'image',
//           image,
//           assetPayload.assetName || 'profile_photo.png'
//         );
//       } else {
//         // @ts-ignore
//         nextFormData.append(key, String(assetPayload[key]));
//       }

//       return nextFormData;
//     },
//     new FormData()
//   );

//   try {
//     const response = await (await getApi()).post<{ assetUri: string }>(
//       `/v1/assets/`,
//       formData
//     );
//     return response.data;
//   } catch (error) {
//     throw parseApiError(error);
//   }
// };
