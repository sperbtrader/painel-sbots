import Image from 'next/image';

const Logo = () => (
  <Image
    src="/sbots_logo.png"
    alt="Logo SBOTS"
    width={32}
    height={32}
    priority
  />
);

export default Logo;
