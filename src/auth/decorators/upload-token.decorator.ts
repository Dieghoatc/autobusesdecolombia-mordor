import { SetMetadata } from '@nestjs/common';

export const UPLOAD_TOKEN_ALLOWED_KEY = 'uploadTokenAllowed';

// Marks an endpoint that also accepts upload tokens (see AuthService.createUploadToken).
// Upload tokens are rejected on every other endpoint.
export const UploadTokenAllowed = () => SetMetadata(UPLOAD_TOKEN_ALLOWED_KEY, true);
