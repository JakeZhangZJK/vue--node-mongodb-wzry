<!--视频上传组件（基于elementUI）-->
<template>
    <div>
       <!-- action必选参数, 上传的地址 -->
    <el-upload class="avatar-uploader el-upload--text" :action="uploadUrl" :show-file-list="false" 
    :on-success="handleVideoSuccess" 
    :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">
        <video v-if="videoForm.Video !='' && videoFlag == false" :src="videoForm.Video" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
        <i v-else-if="videoForm.Video =='' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
        <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
    </el-upload>
    <P class="text">请保证视频格式正确，且不超过500M</P>
    </div>
</template>
<script>
export default {
    data() {
        return{
          videoFlag:false,
          videoUploadPercent:0,
        }
    },
    methods:{

beforeUploadVideo(file) {
    const isLt500M = file.size / 1024 / 1024  < 500;
    if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
        this.$message.error('请上传正确的视频格式');
        return false;
    }
    if (!isLt500M) {
        this.$message.error('上传视频大小不能超过500MB哦!');
        return false;
    }
},
uploadVideoProcess(event, file){
    this.videoFlag = true;
    this.videoUploadPercent = file.percentage.toFixed(0);
},
handleVideoSuccess(res) {
    this.videoFlag = false;
    this.videoUploadPercent = 0;
    if(res.status == 200){
        this.videoForm.videoUploadId = res.data.uploadId;
        this.videoForm.Video = res.data.uploadUrl;
    }else{
        this.$message.error('视频上传失败，请重新上传！');
    }
},
    }
}
</script>
<style lang='less' scoped>
</style>