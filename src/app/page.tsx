"use client";

import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import HoverVideoPlayer from "react-hover-video-player";

const imageArr = [
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/product/2023-9/%25E1%2584%2590%25E1%2585%25B5%25E1%2584%258F%25E1%2585%25A6%25E1%2586%25BA1.jpg",
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/product/2023-9/%25E1%2584%2590%25E1%2585%25B5%25E1%2584%258F%25E1%2585%25A6%25E1%2586%25BA2.jpg",
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/product/2023-9/%25E1%2584%2590%25E1%2585%25B5%25E1%2584%258F%25E1%2585%25A6%25E1%2586%25BA2.jpg",
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/coding.jpeg",
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/react.jpeg",
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/spring.jpeg",
  "https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/vue.jpeg",
];

export default function Home() {
  const [curImage, setCurImage] = useState<number>(0);
  const [testImage, setTestImage] = useState<string | undefined>(undefined);
  const [curFile, setCurFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles[0]);
    setCurFile(acceptedFiles[0]);

    try {
      const fileArr = acceptedFiles;
      let test: any;
      // let fileReader = new FileReader();
      // fileReader.onload = () => {
      //   if (typeof fileReader.result === "string") {
      //     console.log(fileReader.result);
      //   }
      // };
      // fileReader.readAsDataURL(acceptedFiles[0]);

      const fileDataUrl = await new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(acceptedFiles[0]);
      });

      // let file: any;
      // let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
      // let test = [];

      // for (let i = 0; i < filesLength; i++) {
      //   file = fileArr[i];
      //   test.push(file);

      //   const fileDateUrl = await new Promise((resolve, reject) => {
      //     let reader = new FileReader();
      //     reader.onload = () => resolve(reader.result);
      //     reader.onerror = reject;
      //     reader.readAsDataURL(file);
      //   });
      //   setTicketImg((prevImg: string[]) => [...prevImg, fileDateUrl]);
      // }
      // setTicketImageList(test);

      // await setTestImage(fileDataUrl);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "video/*": [".mp4"],
      // "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const ranImage = (curImage: number): any => {
    const ranNum = Math.floor(Math.random() * 7);
    if (curImage === ranNum) return ranImage(curImage);
    setCurImage(ranNum);
  };

  const embeddingHandler = () => {
    axios
      .post("https://dev.admin.snaptag.co.kr/v1/ai/product/before-embedding", {
        email: "sooyoung159@naver.com",
        text: "test",
        alpha: 4,
      })
      .then((data) => {
        console.log(data.data);
        axios
          .post("https://dev.admin.snaptag.co.kr/v1/ai/product/image", {
            productId: data.data.productId,
            imageUrl:
              "https://labcode-core-dev.s3.ap-northeast-2.amazonaws.com/ai/animal/1.jpg",
          })
          .then((data) => {
            console.log(data.data);
            setTestImage(data.data.embeddedImageUrl);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const videoEmbeddingHandler = () => {
    axios
      .post("https://dev.admin.snaptag.co.kr/v1/ai/product/before-embedding", {
        email: "sooyoung159@naver.com",
        text: "test",
        alpha: 4,
      })
      .then((data) => {
        console.log(data.data);
        axios
          .post("https://dev.admin.snaptag.co.kr/v1/ai/product/video", {
            productId: data.data.productId,
            videoUrl:
              "https://labcode-core-dev.s3.ap-northeast-2.amazonaws.com/media//file/sourceImage/2023-10-23/%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%B5.mp4",
          })
          .then((data) => {
            console.log(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadHandler = () => {
    if (!testImage) return;
    axios
      .get(testImage, {
        responseType: "blob",
      })
      .then((data) => {
        console.log(data.data);
        const link = document.createElement("a");
        link.setAttribute("download", "test");
        document.body.appendChild(link);
        const url = window.URL.createObjectURL(
          new Blob([data.data], {
            type: data.headers["content-type"],
          })
        );
        link.href = url;
        link.click();
        link.remove();
      });
  };

  const checkEmbededHandler = () => {
    if (!curFile) return;
    const formData = new FormData();
    formData.append("embeddedVideo", curFile);
    axios
      .post("https://dev.admin.snaptag.co.kr/v1/ai-scan/video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
      })
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (!window) return <></>;

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="w-full">
        <div className="flex p-[20px] gap-[30px] justify-center">
          <div
            onClick={() => ranImage(curImage)}
            className="w-[100px] h-[20px] bg-slate-100 text-center"
          >
            이미지 1
          </div>
          <div
            onClick={() => ranImage(curImage)}
            className="w-[100px] h-[20px] bg-slate-100 text-center"
          >
            이미지 2
          </div>
          <div
            onClick={embeddingHandler}
            className="w-[100px] h-[20px] bg-slate-100 text-center"
          >
            임베딩
          </div>
        </div>
        <div className="w-full h-full flex justify-center ">
          <Image
            src="https://labcode-core-dev.s3.ap-northeast-2.amazonaws.com/ai/%5B%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5%5D+%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF(33)/1.jpg"
            alt="test"
            width={700}
            height={700}
          />
          {/* <Image
            src="https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/product/2023-9/%25E1%2584%2590%25E1%2585%25B5%25E1%2584%258F%25E1%2585%25A6%25E1%2586%25BA2.jpg"
            alt="test"
            width={196}
            height={254}
          />
          <Image
            src="https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/product/2023-9/%25E1%2584%2590%25E1%2585%25B5%25E1%2584%258F%25E1%2585%25A6%25E1%2586%25BA2.jpg"
            alt="test"
            width={196}
            height={254}
          />
          <Image
            src="https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/coding.jpeg"
            alt="test"
            width={196}
            height={254}
          />
          <Image
            src="https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/react.jpeg"
            alt="test"
            width={196}
            height={254}
          />
          <Image
            src="https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/spring.jpeg"
            alt="test"
            width={196}
            height={254}
          />
          <Image
            src="https://planeta-keefo-dev.s3.ap-northeast-2.amazonaws.com/media/product/sourceImage/2023-8-23/vue.jpeg"
            alt="test"
            width={196}
            height={254}
          /> */}
        </div>
        <div className="flex justify-center my-[20px]">
          <button
            onClick={downloadHandler}
            className="w-[100px] h-[30px] bg-slate-100 text-center"
          >
            download
          </button>
        </div>
        {!!testImage && (
          <div>
            <img src={testImage} alt="test" width={320} height={320} />
          </div>
        )}
        <div
          {...getRootProps()}
          // onClick={addTicketImgHandler}
          className="w-full h-[203px] border border-solid border-border rounded-[8px] flex justify-center items-center flex-col"
        >
          <input {...getInputProps()} className="hidden" />
          {/* <div>
            <Image src={upload} alt="upload" />
          </div> */}
          <div className="mt-[20px] text-gray-900 text-[18px] font-bold">
            이미지를 드래그하거나 클릭하여 업로드
          </div>
          <div className="mt-[6px] text-gray-400 text-[13px] text-center">
            {/* <div>•권장 사이즈 1018px*1440px, 4MB</div>
            <div className="mt-[6px]">•JPG, JPEG, PNG 파일만을 지원합니다.</div> */}
          </div>
        </div>
      </div>
      <div>
        <div className="w-[500px]">
          {/* {!!window && (
            <HoverVideoPlayer  videoSrc="https://labcode-core-local.s3.ap-northeast-2.amazonaws.com/sample_embedded.mp4" />
          )} */}
        </div>

        {/* {!!window && (
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            light={true}
          />
        )} */}
      </div>
      {/* {testImage !== "" && (
        <div>
          <div>
            <Image src={testImage} alt="test" width={196} height={254} />
          </div>
          <div>
            <button onClick={checkEmbededHandler}>확인하기</button>
          </div>
        </div>
      )} */}
      <div>워터마크 정보 입력</div>
      <div>워터마크 적용하기</div>
    </div>
  );
}
