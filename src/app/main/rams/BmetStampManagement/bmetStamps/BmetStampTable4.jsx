import withRouter from "@fuse/core/withRouter";
import moment from "moment";

function BmetStampTable4({ classes, agencyInfo }) {
  return (
    <div
      className={`${classes.pageContainer} printPageContainer  overflow-hidden w-full mb-0`}
      style={{ padding: "10px" }}
    >
      <div style={{ paddingTop: "10px" }}>
        <h2 className="text-center">পাতা-৪</h2>

        <span style={{ fontSize: "18px", lineHeight: "50px" }}>
          আমি আরও অঙ্গীকার করছি যে.উপযুক্ত কর্মীদের ভিসা সঠিক আছে। করমীগণ বিদেশে
          যাওয়ার পর সংশিষ্ট নিয়োগকর্তার অধীনে নির্ধারিত পেশায় চাকুরী প্রদানের
          নিশ্চয়তা প্রদান করছি এবং কর্মীগণ বিদেশে যাওয়ার পর চুক্তিপত্র
          অনুযায়ী বেতনভাতাদি এবং অন্যন্য সুযোগ সুবিধা প্রাপ্য না হলে তার সকল
          দায়-দায়িতব বহন করব এবং কর্মীদের অভিবাসন ব্যয়ের বেশিব্যয় গ্রহনকর
          হয়নি।
          <br />
          
          উপযুক্ত অঙ্গীকার নামায় বর্ণিত বিষয়ের কোন ব্যাক্রিম ঘটলে প্রবাসী কল্যাণ
          ও বৈদেশিক কর্মসংস্থান মন্রণালয় অথবা জনশক্তিকর্মসংস্থান ও প্রশিক্ষন
          ব্যুরো আমার বা আমার রিক্রটিং এজেন্সীর বিরুদ্দে বৈদশিক কর্মসংস্থান ও
          অভিবাসী আইন-২০১৩ অনুযায়ী যে কোন ব্যবস্থা গ্রহন করতে পারবে।
          <br />
          
          এই অঙ্গীকার নামায় আমি সেচ্ছায় , স্বঙ্গানে ,সুস্থ মস্তিকে এবং কাহারো
          দ্বারা প্ররোচিত না হয়ে স্বাক্ষর করলাম।
        </span>
        <br />
        
        <p
          className="text-right"
          style={{ fontSize: "18px", lineHeight: "50px" }}
        >
          রিক্রটিং এজেন্সির নামঃ {agencyInfo?.name_bangla}
          <br />
          (আর এল নং{" "}
          {agencyInfo?.rl_no
            ?.toString()
            .replace(/[0-9]/g, (digit) =>
              String.fromCharCode(digit.charCodeAt(0) + 2486)
            )}
          ) <br /> মালিকের নামঃ{agencyInfo?.owner_name}
          <br /> মোবাইলঃ {agencyInfo?.primary_phone} <br /> তারিখঃ
          {moment().format("YYYY-MM-DD")}
        </p>
      </div>
    </div>
  );
}
export default withRouter(BmetStampTable4);
