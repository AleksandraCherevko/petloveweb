// "use client";

// import { useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import Modal from "@/app/components/Modal/Modal";
// import css from "./ModalAttention.module.css";

// export default function ModalAttention() {
//   const router = useRouter();
//   const [isClosing, setIsClosing] = useState(false);

//   const closeModal = useCallback(() => {
//     setIsClosing(true);
//     setTimeout(() => {
//       router.back();
//     }, 200);
//   }, [router]);

//   return (
//     <Modal onClose={closeModal}>
//       <div className={`${css.modal} ${isClosing ? css.modalClosing : ""}`}>
//         <Image
//           src="/images/modal/dog.jpg"
//           width={44}
//           height={44}
//           alt="dog image"
//         />

//         <h3>Attention</h3>
//         <p>
//           We would like to remind you that certain functionality is available
//           only to authorized users.
//         </p>

//         <Link href="/register">Registration</Link>
//         <Link href="/login">Login</Link>
//       </div>
//     </Modal>
//   );
// }
