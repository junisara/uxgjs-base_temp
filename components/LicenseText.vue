<template>
  <div class="description">

    <h2 id="-">스킨 라이선스</h2>
    <ul>
      <li>스킨 구매는 한 개의 티스토리 계정에서 사용이 가능합니다. 단 구매한 한개의 계정내의 모든 블로그에는 적용 가능합니다.</li>
      <li>두 개 이상의 계정에서 사용할 경우에는 티스토리 스킨 라이선스를 두 개 이상 구매해야 합니다.</li>
      <li>팀블로그의 경우는 개설자만 구매를 하면 됩니다.</li>
      <li>스킨을 구매한 후 재판매, 양도, 배포, 대여 등은 할 수 없습니다. 또한 스킨을 변형한 후에도 재판매, 양도, 배포, 대여 등은 할 수 없습니다.</li>
      <li>유료 스킨 구매자는 <code>Copyright</code>와 <code>Design by UX공작소</code>를 수정/삭제 할 수 있습니다.</li>
    </ul>
    <h2 id="-">구매 약관</h2>
    <ul>
      <li>스킨의 구매는 구매희망자가 선입금하면 배포사이트에서 다운로드 할 수 있는 권한이 주어지며 다운로드를 하면 됩니다.</li>
      <li>자료의 특성상 복제가 가능하기 때문에 교환, 환불, 반품은 불가합니다. 그러므로 <b>데모보기</b> 를 통해 충분히 확인하시고 구매하시기를 바랍니다.</li>
      <li><code>스킨 구매</code>는 <code>스킨 저작권 구매</code>를 의미하지 않습니다. 스킨 구매 이후에도 <code>스킨 저작권</code>은 여전히 <code>UX공작소</code>에 있습니다.</li>
      <li>스킨 구매자 본인의 경우(구입시 등록한 이메일로 확인) 스킨파일 분실 시 재요청을 하시면 구매한 스킨을 다시 보내드립니다.</li>
      <li>스킨 구매 시 구매자의 정보를 별도 저장하여 보관합니다. 이는 스킨의 오류 수정이나 패치 버전의 배포, 라이선스 관련 문제가 발생했을 떄 사용됩니다.<br>

            저장정보는  회원가입 시 <code>회원가입 일</code>, <code>닉네임</code>, <code>이메일</code>, <code>프로필사진</code> <br>
            구매 시는 <code>구매일시</code>, <code>구매 스킨 정보</code>, <code>티스토리아이디</code>, <code>사용할 블로그 주소</code> 내용입니다.</li>
      <li>구매자는 스킨 라이선스를 지킬것을 약속하고, 이를 무시하고 재판매, 양도, 배포, 대여 등의 행위를 할 경우 저작자는 고소, 손해배상을 청구 할 수 있습니다.</li>
      <li>스킨을 사용하여 불법 사이트를 운영하다 적발 시 스킨의 저작자는 일체 책임을 지지 않습니다.</li>
    </ul>
    <h2 id="-">스킨문의</h2>
    <ul>
      <li>스킨은 오류를 제외한 요청에 대해서는 지원하지 않습니다.</li>
      <li>스킨에 오류가 있는경우 최대한 빠른 시일 내로 수정하여 새로운 버전으로 배포하겠습니다.</li>
      <li>오류가 아닌 기능추가 요청, 개선안 등의 경우는 차기버전에 반영을 할 수도 있습니다.</li>
      <li>스킨은 구매자가 변형하여 구매한 계정의 블로그에 대해 수정 적용은 가능하나 그에 따른 오류 등 문제가 발생했을 때는 저작자가 책임을 지지 않습니다.</li>
    </ul>
    <h2 id="-">유료구매 제공 서비스</h2>
    <p>티스토리 스킨 구매 시 다음과 같은 서비스를 제공받습니다</p>
    <ul>
      <li>스킨 설치 문의 지원</li>
      <li>구매 스킨에 대해서 회원 인증을 통해 지속적으로 다운로드 가능</li>
    </ul>

</div>
</template>

<script>
export default {
  name: 'LicenseText'

}
</script>

<style lang="scss" scoped>
  .description {
    font-size: 1.1rem;
    line-height: 2rem;
    h2 {
      display: flex;
      justify-content: space-between;
      font-size: 1.8rem;
      font-weight: 300;
      line-height: 1.8rem;
      margin-top: 5rem;
      margin-bottom: 2rem;
      align-items: center;
      &:before {
          content:"";
          text-align: left;
          flex-grow: 1;
          margin-right:0.5rem;
          border-bottom:1px solid $gray-200 ;
      }
      &:after {
          content:"";
          text-align: right;
          flex-grow: 1;   
          margin-left:0.5rem;      
          border-bottom:1px solid $gray-200 ;
        }
    }
  }
</style>
