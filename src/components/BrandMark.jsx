// The authentic D6 mark (extracted from the company logo) on a white tile,
// so the blue keeps its contrast on the navy page.
const BrandMark = ({ size = 44 }) => (
  <span className="brand-mark" style={{ width: size, height: size }}>
    <img src={`${import.meta.env.BASE_URL}brand/d6-mark.png`} alt="" width={size * 0.74} height={Math.round(size * 0.74 * 0.654)} />
  </span>
);

export default BrandMark;
