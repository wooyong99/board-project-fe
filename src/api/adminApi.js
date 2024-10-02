import instance from './http';

// 관리자 회원가입 API 호출
export function fetchAdminSignup(data) {
  return instance.post('/admins/signup', data);
}

// 회원 차단 API 호출
export function fetchBlockMember(memberId) {
  return instance.put(`/admins/members/${memberId}/block`);
}

// 회원 차단 해제 API 호출
export function fetchUnBlockMember(memberId) {
  return instance.put(`/admins/members/${memberId}/unblock`);
}

// 회원 목록 조회 API 호출
export function fetchMemberList(data) {
  const params = {};

  if (data?.value?.keyword) {
    params.keyword = data.value.keyword;
  }

  if (data?.value?.page !== undefined) {
    params.page = data.value.page;
  }

  return instance.get('/admins/search/members', { params });
}
