const cloudName = "dqthqbwff"
const presetName = "nath-pictures"

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", presetName)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  })

  const data = await response.json()
  return data.secure_url
}
