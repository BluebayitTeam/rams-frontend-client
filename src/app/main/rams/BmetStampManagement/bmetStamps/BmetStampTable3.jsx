import withRouter from "@fuse/core/withRouter";

function BmetStampTable3({ classes, data, country, agencyInfo }) {
  return (
    <div
      className={`${classes.pageContainer} printPageContainer  overflow-hidden w-full mb-0`}
      style={{ padding: "10px" }}
    >
      <div style={{ paddingTop: "10px" }}>
        <h2 className="text-center">পাতা-৩</h2>

        <span style={{ fontSize: "18px", lineHeight: "50px" }}>
          আমি রিক্রটিং এজেন্সী মেসার্স {agencyInfo?.name_bangla} (আর এল নং{" "}
          {agencyInfo?.rl_no
            ?.toString()
            .replace(/[0-9]/g, (digit) =>
              String.fromCharCode(digit.charCodeAt(0) + 2486)
            )}
          ) এর স্বত্রাধিকারী/ব্যবস্থাপনা অংশীদার/ব্যবস্থাপনা পরিচালক এই মর্মে
          অঙ্গীকার করছি যে, চাকুরীর উদ্দেশ্যে {country}
          দেশের সৌদি নিয়োগকর্তার অধীনে বর্ণিত{" "}
          {data?.data?.length
            ?.toString()
            .replace(/[0-9]/g, (digit) =>
              String.fromCharCode(digit.charCodeAt(0) + 2486)
            )}{" "}
          জন কর্মীর ভিসা প্রসেসিংসহ জনশক্তি কর্মসংস্থান ও প্রশিক্ষণব্যুরো হতে
          একক বহির্গমন ছাড়পত্র গ্রহণের নিমিত্ত বিদেশগামী কর্মীর নিকট হতে
          প্রয়োজনীয় কাগজপত্র বুঝে পেয়েছি, যাহাসঠিক আছে মর্মে প্রতীয়মান
          হয়েছে। উপস্থাপিত ভিসা গুলোরমধ্যে বিভিন্ন নিয়োগ কর্তার অধীনে{" "}
          {data?.data?.length
            ?.toString()
            .replace(/[0-9]/g, (digit) =>
              String.fromCharCode(digit.charCodeAt(0) + 2486)
            )}{" "}
          জনের অধিক প্রেরণকরা হচ্ছেনা অথবা ভিসা গুলোগ্রুপ ভাঙ্গা হয়নি।
          <br />
         
          উপযুক্ত কর্মীদের সৌদিআরব বিমানবন্দরে নিয়োগকর্তা বা নিয়োগকর্তার
          প্রতিনিধি গ্রহণকরবে মর্মে অঙ্গিকার করছি।
          <br />
        
          বিদেশগমনের পর কোন কারণে কর্মীদের বিমান বন্দরহতে নিয়োগকর্তা গ্রহণ না
          করে অথবা কর্মীদের ভিসা জাল বলে প্রমানিত হয় অথবা অন্য কোন কারণে
          চাকুরীতে সমস্যার সৃষ্টি হয় তাহলে উক্ত কর্মীর/কর্মীদের সকল
          দায়-দায়িত্ব আমি বা আমার রিক্রটিং এজেন্সী বহন করতে বাধ্য থাকব।
          উল্লেখ্য যে,বর্ণিত কর্মীগণকে সৌদিআরব প্রেরণের জন্য বহির্গমন ছাড়পত্র
          গ্রহনের পর সৌদি ব্যতীত অন্য কোন দেশে প্রেরণের অপচেষ্টা করব না মর্মে ও
          অঙ্গীকার করছি।
        </span>
        <br />
        <p className="text-right">চলমান পাতা-৩</p>
      </div>
    </div>
  );
}
export default withRouter(BmetStampTable3);
