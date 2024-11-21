<script>
  const navLinks = [
    { href: '/', text: 'home' },
    { href: '/menu', text: 'menu' },
    { href: '/retail', text: 'shop retail' },
    { href: '/takeaway', text: 'weekly takeaway' },
    { href: '/about', text: 'about' },
    { href: '/gallery', text: 'gallery' },
    { href: '/gift', text: 'gift' },
    { href: '/connect', text: 'connect' }
  ];
</script>
<nav>
  <a href="/" class="logo">
    <img src="images/crf-logo.svg" alt="Logo" />
    <span>Chicago Raw Food</span>
  </a>
  <ul>
    {#each navLinks as { href, text }}
      <li><a href={href}>{text}</a></li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    height: 8vh;
    border: 2px solid orange;
  }
  .logo {
    display: flex;
    align-items: center;
    height: 75%;
    width: auto;
  }
  ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  li a {
    text-decoration: none;
  }
</style>