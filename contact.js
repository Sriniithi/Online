// Firebase setup
const firebaseConfig = {
    // Your Firebase config here
  };
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  
  $(document).ready(function () {
    // Track Order functionality
    $("#trackOrderBtn").click(function () {
      const orderID = $("#orderID").val();
      if (orderID) {
        db.collection("OrderHistory").doc(orderID).get().then(doc => {
          if (doc.exists) {
            const order = doc.data();
            $("#orderStatus").text(`Your order was placed on ${order.timestamp.toDate().toLocaleString()} and is currently ${order.status}.`);
          } else {
            $("#orderStatus").text("Order not found.");
          }
        }).catch(error => {
          console.error("Error fetching order: ", error);
          $("#orderStatus").text("Error fetching order.");
        });
      } else {
        $("#orderStatus").text("Please enter a valid order ID.");
      }
    });
  
    // Return Order functionality
    $("#returnOrderBtn").click(function () {
      const returnOrderID = $("#returnOrderID").val();
      const returnReason = $("#returnReason").val();
  
      if (returnOrderID && returnReason) {
        db.collection("Returns").add({
          orderID: returnOrderID,
          reason: returnReason,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          $("#returnStatus").text("Your return request has been submitted.");
        }).catch(error => {
          console.error("Error processing return: ", error);
          $("#returnStatus").text("Error processing return.");
        });
      } else {
        $("#returnStatus").text("Please fill out both fields.");
      }
    });
  });
  