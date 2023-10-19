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

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        scale: 4,
        alpha: 8,
        embedding: "v25",
        channel: "lab",
        amount: 1,
        unit: 1,
        dpi: 300,
        colorSpace: "RGB",
      })
      .then((data) => {
        console.log(data.data);
        axios
          .post("https://dev.admin.snaptag.co.kr/v1/ai/product", {
            productId: data.data.productId,
            imageUrl: imageArr[curImage],
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

  if (!window) return <></>;

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
          <Image src={imageArr[curImage]} alt="test" width={196} height={254} />
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
          {!!window && (
            <HoverVideoPlayer  videoSrc="https://labcode-core-local.s3.ap-northeast-2.amazonaws.com/sample_embedded.mp4" />
          )}
        </div>

        {!!window && (
          <ReactPlayer
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            light={true}
          />
        )}
      </div>
      <div>워터마크 정보 입력</div>
      <div>워터마크 적용하기</div>
    </div>
  );
}
