<template>
  <div class="competitionContainer">
    <div v-for="competition in this.competitionList" class="competition">
      <div>
        <el-image :src="competition.url"></el-image>
      </div>
      <div class="competitionInfo">
        <h3>
          <el-tag v-if="new Date() < new Date(competition.starttime)" type="warning">报名中...</el-tag>
          <el-tag v-if="new Date(competition.starttime) <= new Date() && new Date() <= new Date(competition.endtime)"
            type="success">比赛中...</el-tag>
          <el-tag v-if="new Date() > new Date(competition.endtime)">比赛结束</el-tag>
          <a @click="toDetail(competition.id)" style="cursor: pointer;">{{ competition.name }}</a>
        </h3>
        <p>
          <span class="hd">创建人</span>
          <span>{{ competition.username }}</span>

        </p>
        <p>
          <span class="hd">竞赛级别</span>
          <span>全国性</span>
        </p>
        <p>
          <span class="hd">报名时间</span>
          <span>{{ dateFormat(competition.starttime) + '截至' }}</span>

        </p>
        <p>
          <span class="hd">比赛时间</span>
          <span>{{ dateFormat(competition.starttime) + ' ~ ' + dateFormat(competition.endtime) }}</span>

        </p>
      </div>
      <div class="info">
        <p v-if="new Date() < new Date(competition.starttime)">距离报名截止还有 {{ parseInt((new
          Date(competition.starttime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) }} 天</p>
        <p v-else>报名结束</p>
        <el-button v-if="new Date() < new Date(competition.starttime) && competition.applyStatus === 1"
          @click="toDetail(competition.id)">点击报名</el-button>
        <el-button v-if="new Date() < new Date(competition.starttime) && competition.applyStatus === 0"
          @click="toDetail(competition.id)">取消报名</el-button>
        <p>
          <span style="cursor: pointer" @click="toDetail(competition.id)">竞赛详情 ></span>
        </p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "competition",
  data() {
    return {
      competitionList: [],
      userId: 0,
      loading: false
    }
  },
  created() {
    this.userId = sessionStorage.getItem("userId");
    this.getUserCompetitionList();
  },
  methods: {
    toDetail(id) {
      sessionStorage.setItem("competitionId", id);
      this.$router.push({
        path: '/user/competitionDetail'
      })
    },
    getUserCompetitionList() {
      this.$axios.get("/competition/getCompetitionList/" + this.userId).then(res => {
        this.competitionList = res.data.data.competitionList;
        this.loading = false;
      })
    },
    dateFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return (year + "-" + month + "-" + day);
    },
  }
}
</script>

<style scoped>
.competitionContainer {
  display: flex;
  flex-wrap: wrap;
}

.competition {
  width: 25%;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 2000px) {
  .competition {
    width: 20%;
  }
}

@media (max-width: 1600px) {
  .competition {
    width: 33.3%;
  }
}

@media (max-width: 1250px) {
  .competition {
    width: 50%;
  }
}

@media (max-width: 900px) {
  .competition {
    width: 100%;
  }
}

.competitionInfo {
  width: 90%;
}

h3 {
  font-size: 18px;
  margin: 10px 0;
  letter-spacing: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


p {
  color: #aaa;
}

.hd {
  width: 100px;
  overflow: hidden;
  font-weight: 600;
  margin-right: 10px;
}

.info {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}

.info .el-button {
  background-color: #34bfa7;
  color: #fff;
  font-weight: 600;
  padding: 15px 30px;
}

.info p {
  color: #666;
  font-weight: 600;
}


.el-image {
  width: 100%;
  border-radius: 15px;
}
</style>
