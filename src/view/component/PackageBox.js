import React from "react";

function PackageBox({ item, selectedPackage, setSelectedPackage, index }) {
  const name = () => {
    if (index == 0) return "General Test Package";
    if (index == 1) return "Gate Test Package";
  };
  return (
    <div
      className={`package ${index == selectedPackage ? "selected" : ""}`}
      onClick={() => setSelectedPackage(index)}
    >
      <div className="packageText">{name()}</div>
      {/* <div className="packageText">Total Questions {item.questionCount}</div> */}
    </div>
  );
}

export default PackageBox;
