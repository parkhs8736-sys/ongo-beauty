# 온고뷰티 브랜드 홈페이지

남성·여성의 머릿결을 관리하는 고데기, 매직기, 헤어드라이기 브랜드 **온고뷰티**의 정적 홈페이지입니다.

## 페이지

- `index.html` — 홈
- `about.html` — 내 소개
- `products.html` — 제품
- `stories.html` — 이야기
- `contact.html` — 연락하기

## 실행

빌드 과정 없이 `index.html`을 브라우저에서 열면 됩니다. 로컬 서버를 사용하면 페이지 사이를 더 안정적으로 이동할 수 있습니다.

```bash
python -m http.server 8000
```

현재 제품명, 사양, 연락처, 블로그 글은 자연스러운 임시 내용으로 작성되어 있습니다.

## 제품 추가 및 수정

제품 목록은 `products.json` 한 파일에서 관리합니다. 배열에 아래 형식의 항목을 추가하면 제품 페이지에는 전체 제품이, 홈에는 앞쪽 최대 3개 제품이 자동으로 표시됩니다.

```json
{
  "name": "제품명",
  "price": 130000,
  "image": "https://example.com/product.png",
  "url": "https://smartstore.naver.com/example/products/123"
}
```

가격을 숫자로 입력하면 원화 형식으로 표시됩니다. 판매가를 사이트에 직접 표시하지 않으려면 `"스토어에서 확인"`처럼 문구를 입력할 수 있습니다.
