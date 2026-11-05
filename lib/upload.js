// Uploads an image file to imgbb and returns its public URL
export async function uploadImage(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, {
    method: "POST",
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  if (!json.success) throw new Error("Image upload failed. Check the file and try again.");
  return json.data.display_url;
}
