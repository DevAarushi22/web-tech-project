async function handleSubmit(e) {
    e.preventDefault();
  
    // Access form input values using refs
    const Firstname = document.getElementById('Firstname').value;
    const Lastname = document.getElementById('Lastname').value;
    const Email = document.getElementById('email').value;
    const Password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:3000/signupUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Firstname, Lastname, Email, Password }) // Send name, email, password in JSON format
      });
  
      if (response.ok) {
        alert('User Registered. Head to Login');
        // Handle successful registration (e.g., redirect to login page)
        window.location.href = '/login';
      } else {
        const json = await response.json();
        // Handle registration error
        alert(json.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      alert('Error during signup. Please try again.');
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    const Email = document.getElementById('Email').value;
    const Password = document.getElementById('Password').value;

    try {
        const response = await fetch("http://localhost:3000/loginUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({Email, Password })
        });
  
        if (response.ok) {
            alert("Correct credentials")
        } else {
          alert("Email or Password incorrect")
        }
    } catch {
        alert('Failed to sign in');
    }
}