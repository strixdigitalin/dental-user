import React from "react";

function PackageBox({ item, selectedPackage, setSelectedPackage, index }) {
  return (
    <div
      className={`package ${index == selectedPackage ? "selected" : ""}`}
      onClick={() => setSelectedPackage(index)}
    >
      <div className="packageText">{item.title}</div>
      <div className="packageText">Total Questions {item.questionCount}</div>
    </div>
  );
}

export default PackageBox;
