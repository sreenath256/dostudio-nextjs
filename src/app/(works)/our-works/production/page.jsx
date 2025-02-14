"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Import the lightbox styles
import ReactPlayer from 'react-player';



async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/productions?&populate=*`,
    { next: { revalidate: 60 } } // Revalidate every 60 seconds
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const Production = () => {
  const [workdata, setWorkdata] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Lightbox open state
  const [photoIndex, setPhotoIndex] = useState(0); // Current image index
  const [images, setImages] = useState([]); // Image URLs for the lightbox
  const [isLoading, setIsLoading] = useState(true); // Loading state



  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      const data = await getData();
      setWorkdata(data.data);
      setIsLoading(false); // Stop loading

      return console.log(data)

      // Extract image URLs for the lightbox
      const sorted = data.data?.sort(
        (a, b) => a.attributes.order - b.attributes.order
      );
      const imageUrls = sorted.map(
        (item) => item.attributes.image.data.attributes.url
      );
      setImages(imageUrls);

    };
    fetchData();
  }, []);



  // Sort the data by the order field
  const sortedData = workdata?.sort(
    (a, b) => a.attributes.order - b.attributes.order
  );


  // Handle image click
  const handleImageClick = (order) => {
    const index = sortedData.findIndex((item) => item.attributes.order === order);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const convertDriveUrl = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
  };


  const fetchVideoUrl = async () => {
    const apiKey = "YOUR_GOOGLE_DRIVE_API_KEY"; // Replace with your API key
    const directLink = `https://www.googleapis.com/drive/v3/files/1AjnBNdITZ9T75EMFFEPlwf-TKqX54FVl?alt=media&key=AIzaSyBl6PF6Uvdr72gXXkkUaIvBSDYUBtmfBlM`;
    // setVideoUrl(directLink);
    console.log(directLink)
  };

  // fetchVideoUrl();


  return (
    <main className='min-h-screen w-full bg-white pt-32 md:text-4xl h-10 text-black font-light'>
      <div
        className={`w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5 `}

      >
        <h1 className={`pb-1 font-medium`}>
          videos
        </h1>
      </div>
      <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20  grid grid-cols-2 md:grid-cols-3    gap-x-0 gap-y-0'>
        {isLoading ? (
          // Skeleton loading
          <Skeleton style={{ aspectRatio: "9/16", gap: "0" }} count={9} />
        ) : workdata && workdata.length > 0 ? (
          workdata.map((data, i) => (
            <div className="relative group" key={i}>


              <div
                className={`relative w-full break-inside-avoid-column`}
                style={{
                  aspectRatio: data.attributes.height
                    ? `${data.attributes.height}` // Dynamic aspect ratio
                    : "9/16", // Fallback to a square aspect ratio
                }}
              >

                <iframe
                  src={`${convertDriveUrl(data?.attributes?.videourl)}`}
                  className=" w-full h-full  relative"
                  allow="autoplay"
                  allowFullScreen="true"

                ></iframe>
                {/* <ReactPlayer url="https://drive.google.com/file/d/1AjnBNdITZ9T75EMFFEPlwf-TKqX54FVl/preview" controls /> */}


              </div>
            </div>
          ))
        ) : (
          <div className="text-left text-2xl font-medium animate-bounce">
            No data found.
          </div>
        )}

      </div>
    </main>
  )
}

export default Production
