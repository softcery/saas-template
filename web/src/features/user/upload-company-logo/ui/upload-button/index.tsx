import { useAppDispatch } from '~/shared/lib/hooks'
import { Button, FileButton } from '~/shared/ui/atoms'

import { uploadCompanyLogoSlice } from '../../model'
import { useUploadCompanyLogoSelectors } from '../../lib'

export const UploadCompanyLogoButton = () => {
  const dispatch = useAppDispatch()
  const isLoading = useUploadCompanyLogoSelectors.isUpdating()

  const upload = (file: File) => {
    dispatch(uploadCompanyLogoSlice.uploadCompanyLogo({ file }))
  }

  const handleFile = (file: File | null) => {
    if (file) upload(file)
  }

  return (
    <FileButton
      onChange={handleFile}
      accept="image/png,image/jpeg"
      inputProps={{
        value: '',
      }}
    >
      {(props) => (
        <Button size="xs" loading={isLoading} w="max-content" {...props}>
          Upload logo
        </Button>
      )}
    </FileButton>
  )
}
