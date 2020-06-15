//上传混入
export const uploadMixin = {
  computed: {
    action() {
      return process.env.VUE_APP_API_URL_UPLOAD || '/admin/api/upload/'
    },
    token() {
      const token = sessionStorage.getItem('token')
      if (token) return { Authorization: token }
      return {}
    }
  },
  methods: {
    uploadErrHandler(res) {
      if (res.status === 401) {
        this.$message.error('请先登录')
        router.push('/login')
      }
    }
  }

}