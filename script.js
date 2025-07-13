function makePayment() {
  const amount = document.getElementById("amount").value;
  const status = document.getElementById("status");

  if (!amount || amount <= 0) {
    status.innerText = "❌ Please enter a valid amount.";
    status.style.color = "red";
    return;
  }

  status.innerText = "";
  document.getElementById("loader").style.display = "block";

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";

    const utr = "UPI" + Math.floor(Math.random() * 1000000000);
    const time = new Date().toLocaleString();
    const message = `✅ ₹${amount} sent to luv@ybl\n📎 UTR: ${utr}\n🕒 ${time}`;

    let txns = JSON.parse(localStorage.getItem("txnHistory")) || [];
    txns.unshift({ amount, utr, time });
    txns = txns.slice(0, 2);
    localStorage.setItem("txnHistory", JSON.stringify(txns));

    status.innerText = message;
    status.style.color = "green";
  }, 2000);
}

window.onload = function () {
  const history = JSON.parse(localStorage.getItem("txnHistory")) || [];
  if (history.length) {
    const status = document.getElementById("status");
    let msg = "🕘 Last Transactions:\n";
    history.forEach(txn => {
      msg += `₹${txn.amount} | ${txn.utr} | ${txn.time}\n`;
    });
    status.innerText = msg;
    status.style.color = "#1e40af";
  }
};