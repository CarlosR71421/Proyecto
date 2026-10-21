<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Relojes Ben 10</title>

  <link rel="stylesheet" href="{{ asset('CSS/style.css') }}">
</head>
<header>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li>
          <a href="{{ route('welcome') }}">Nosotros</a>
        </li>
        <li class="nav-item">
          <a href="{{ route('log') }}">Inicia sesión</a>
        </li>
        <li class="nav-item">
          <a href="{{ route('register') }}">Regístrate</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
<body>
    <h1>Registrate</h1>
    <form action="{{ route('register') }}" method="post">
        <label for="username">Nombre:</label>
        <input type="text" id="username" name="username" required><br><br>
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required><br><br>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br><br>
        <input type="submit" value="Registrate">
    </form>


    <footer>
    <p>&copy; Me reservo el GTA VI</p>
</footer>    
</body>
</html>