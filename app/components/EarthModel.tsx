import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const EarthModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  // ❶ AnimationMixer もリファレンス保持しておく
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  // 毎フレームごとの経過時間を取得するための Clock
  const clockRef = useRef<THREE.Clock | null>(null);

  useEffect(() => {
    // ------- 1. シーン、カメラ、レンダラーを用意する -------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75, // 視野角
      300 / 300, // アスペクト比
      0.1, // near
      1000 // far
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    const width = mountRef.current!.clientWidth;
    const height = mountRef.current!.clientHeight;
    renderer.setSize(width, height);
    // mountRef.current に renderer.domElement (canvas) を挿入
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // ------- 2. 簡単なライトを追加 (暗闇対策) -------
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(0, 10, 10);
    scene.add(light);

    // ❷ Clock を生成
    clockRef.current = new THREE.Clock();
    // "/models/webdev_gltf/scene.gltf"
    // "/models/wonderful_world/scene.gltf"

    // ------- 3. GLTFLoader でモデルを読み込む -------
    const loader = new GLTFLoader();
    loader.load(
      "/models/wonderful_world/scene.gltf",
      (gltf: any) => {
        const model = gltf.scene;
        // 例としてスケール、位置、回転を適用
        model.scale.set(1.2, 1.2, 1.2); // x, y, z すべて 0.1倍
        model.position.set(0, 0, 0); // x=0, y=-1, z=0 に移動
        model.rotation.set(0, 0, 0); // y軸に90度 ( π/2 ) 回転
        modelRef.current = model;

        scene.add(model);

        // ❸ アニメーションがあるか確認
        if (gltf.animations && gltf.animations.length > 0) {
          console.log({ animations: gltf.animations });
          // ❹ AnimationMixer を作成 → モデルを紐づける
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          // ❺ 任意のアニメーションクリップを再生 (複数ある場合は0番目を再生例)
          const clip = gltf.animations[0]; // 最初のアニメーション
          const action = mixer.clipAction(clip);
          action.play();
        }
      },
      (xhr: any) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error: any) => {
        console.error("An error happened", error);
      }
    );

    // ------- 4. アニメーションループを定義 -------
    const animate = () => {
      requestAnimationFrame(animate);

      // ❻ 毎フレームごとに Mixer をアップデート (アニメーション進行)
      if (mixerRef.current && clockRef.current) {
        const delta = clockRef.current.getDelta();
        mixerRef.current.update(delta);
      }
      // if (modelRef.current) {
      //   modelRef.current.rotation.y += 0.005;
      // }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    // 初期表示でも一度計算しておく
    handleResize();

    // ------- 5. クリーンアップ (アンマウント時) -------
    return () => {
      window.removeEventListener("resize", handleResize);
      // もし dispose が必要なリソースがあればここで掃除
      renderer.dispose();
      // mountRef.current から canvas を削除したいなら
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // レンダリング先として使う <div> を返す
  return (
    <div
      ref={mountRef}
      className=" w-[90vw] max-h-[200px] sm:max-h-full sm:h-5/6 h-1/4 mx-auto"
    />
  );
};

export default EarthModel;

// エラーが起きて対象方法がわからなかったため、このファイルだけjsxにしている。
// エラー内容
// プロパティ 'primitive' は型 'JSX.IntrinsicElements' に存在しません。ts(2339)
// 'object' が複数回指定されているため、ここでの使用は上書きされます。ts(2783)
// WebDev.tsx(15, 36): このスプレッドは、常にこのプロパティを上書きします。

//後でtypescriptに変更する時のこと
//以下がシンプルな例らしい
// WebDevModel.tsx (拡張子は .ts でも .tsx でもOK)
// import React from "react"
// import { useGLTF } from "@react-three/drei"
// // もし型定義をより正確にするなら three-stdlib の GLTF 型を import
// import { GLTF } from "three-stdlib"
// import { GroupProps } from "@react-three/fiber"

// // ❶ gltfjsx が生成する nodes, materials の型を拡張したいなら:
// type GLTFResult = GLTF & {
//   nodes: {
//     // ... gLTFの構成に合わせて定義
//   },
//   materials: {
//     // ... gLTFの構成に合わせて定義
//   }
// }

// // ❷ props の型は、<group> に渡せるプロパティの型 (GroupProps) を継承
// type WebDevModelProps = GroupProps

// export default function WebDevModel(props: WebDevModelProps) {
//   const { nodes, materials } = useGLTF("/models/webdev_gltf/scene.gltf") as GLTFResult

//   return (
//     <group {...props} dispose={null}>
//       {/* gltfjsx の生成コードそのまま */}
//       <group scale={0.01}>
//         {/* ... <mesh> や <group> が並ぶ ... */}
//       </group>
//     </group>
//   )
// }

// // preload はお好みで
// useGLTF.preload("/models/webdev_gltf/scene.gltf")
