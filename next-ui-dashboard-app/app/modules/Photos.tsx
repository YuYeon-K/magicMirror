import Image from "next/image"
const Photos = async ({
  category
}: {
  category: "Wildlife" | "Landscape" | "Cityscape" | "Space"
}) => {
  const min = Math.ceil(1)
  const max = Math.floor(3)
  const imageNum = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(imageNum)
  const num = imageNum.toString()
  const cat = category.toLowerCase().trim()
  const numStr = `/images/${cat}/image${num}.jpg`
  return (
    <div className="pr-3">
      <Image
        className="rounded"
        src={numStr}
        width={300}
        height={300}
        alt="photo"
      ></Image>
    </div>
  )
}

export default Photos
