// Firebase setup
const firebaseConfig = {
    // Your Firebase config here
  };
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  $(document).ready(function () {
    auth.onAuthStateChanged(user => {
      if (user) {
        // Display user email
        document.getElementById("userEmail").textContent = user.email;
  
        // Fetch order history
        const orderHistoryRef = db.collection("OrderHistory");
        orderHistoryRef.where("email", "==", user.email).get().then(snapshot => {
          const orderHistoryList = document.getElementById("orderHistoryList");
          snapshot.forEach(doc => {
            const order = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `Order #${doc.id} - Date: ${order.timestamp.toDate().toLocaleString()} - Total: $${order.total}`;
            orderHistoryList.appendChild(listItem);
          });
        }).catch(error => {
          console.error("Error fetching order history: ", error);
        });
      } else {
        window.location.href = "login.html";  // Redirect to login if not authenticated
      }
    });
  });
  