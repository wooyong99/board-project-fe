import instance from './http';

// 문의 생성
export function fetchInquire(data) {
  return instance.post('/inquiries', data);
}

// 특정 문의 조회
export function fetchInquiry(id) {
  return instance.get(`/inquiries/${id}`);
}

// 문의 리스트 조회
export function fetchInquiryList(data) {
  const params = {};

  if (data?.value?.keyword != null && data?.value?.keyword !== '') {
    params.keyword = data.value.keyword;
  }

  if (data?.value?.page != null && data.value.page !== 0) {
    params.page = data.value.page;
  }

  return instance.get('/inquiries', { params });
}
