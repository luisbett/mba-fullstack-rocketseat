import { api } from '@/lib/axios'

export interface UploadImageBody {
  files: FormData
}

interface UploadImageResponse {
  attachments: {
    id: string
    url: string
  }[]
}

export async function UploadImage({
  files,
}: UploadImageBody): Promise<UploadImageResponse> {
  const attachments = await api.post<UploadImageResponse>('/attachments', files)

  return attachments.data
}
