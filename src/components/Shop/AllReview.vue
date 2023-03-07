<template>
  <div>
    <v-row class="mb-1">
      <v-col cols="6" class="d-flex justify-start text-start">
        <h2 class="display-1 font-weight-bold">รีวิวทั้งหมด</h2>
      </v-col>
    </v-row>
    <v-divider class="mb-6"></v-divider>
    <div v-if="screenWidth > 500">
      <v-row class="mb-1">
        <v-col
          cols="12"
          v-for="(book, index) in reviews.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
          class="mb-5 d-flex justify-center"
        >
          <v-card class="card-review pa-3" max-width="full" height="280">
            <div
              v-for="(review, index) in book.reviews
                .slice()
                .reverse()
                .splice(0, 1)"
              :key="index"
            >
              <v-row>
                <v-col cols="6">
                  <v-card max-width="full" height="250">
                    <v-row class="ma-2">
                      <v-col cols="12">
                        <p class="review-comment">{{ review.comment }}</p>
                        <p class="text-show-all" @click="hidereview(review)">
                          แสดงทั้งหมด
                        </p>
                      </v-col>
                      <v-card-subtitle class="subtitle-2 text-uppercase"
                        >รีวิวจาก
                      </v-card-subtitle>
                      <v-col cols="12">
                        <p>{{ review.user.name }}</p>
                        <div style="font-size: 10px">
                          <v-rating
                            v-model="review.rating"
                            color="#5a5a5a"
                            active-color="#e83e8c"
                            empty-icon="mdi-cards-heart"
                            full-icon="mdi-cards-heart"
                            readonly
                            hover
                            size="16"
                          />
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <div>
                    <v-row class="d-flex justify-center">
                      <v-col cols="12">
                        <v-img
                          :src="book.imageBook"
                          max-width="100%"
                          height="150"
                        ></v-img>
                      </v-col>
                      <v-col cols="12">
                        <p
                          style="font-size: 16px; font-weight: bold"
                          class="review-comment"
                        >
                          {{ book.name }}
                        </p>
                        <p style="font-size: 12px">Author: {{ book.author }}</p>
                        <p style="font-size: 12px">
                          Category: {{ book.category }}
                        </p>
                        <p style="font-size: 12px; color: red">
                          {{ book.rating }} คะแนน จาก {{ book.ratingsCount }}
                        </p>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </div>
    <div v-else>
      <v-row class="mb-1">
        <v-col
          cols="12"
          v-for="(book, index) in reviews.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
          class="mb-5"
        >
          <v-card class="mx-auto bg-card pa-3" max-width="340" height="360">
            <div
              v-for="(review, index) in book.reviews
                .slice()
                .reverse()
                .splice(0, 1)"
              :key="index"
            >
              <v-card max-width="320" height="200">
                <v-row class="ma-2">
                  <v-col cols="12">
                    <p class="review-comment">{{ review.comment }}</p>
                    <p class="text-show-all" @click="hidereview(review)">
                      แสดงทั้งหมด
                    </p>
                  </v-col>
                  <v-card-subtitle class="subtitle-2 text-uppercase"
                    >รีวิวจาก
                  </v-card-subtitle>
                  <v-col cols="12">
                    <p>{{ review.user.name }}</p>
                    <div style="font-size: 10px">
                      <v-rating
                        v-model="review.rating"
                        color="#5a5a5a"
                        active-color="#e83e8c"
                        empty-icon="mdi-cards-heart"
                        full-icon="mdi-cards-heart"
                        readonly
                        hover
                        size="16"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-img
                    :src="book.imageBook"
                    max-width="60"
                    height="90"
                    cover
                  ></v-img>
                </v-col>
                <v-col cols="7">
                  <v-row>
                    <v-col cols="12">
                      <p
                        style="font-size: 16px; font-weight: bold"
                        class="review-comment"
                      >
                        {{ book.name }}
                      </p>
                      <p style="font-size: 12px">Author: {{ book.author }}</p>
                      <p style="font-size: 12px">
                        Category: {{ book.category }}
                      </p>
                      <p style="font-size: 12px; color: red">
                        {{ book.rating }} คะแนน จาก {{ book.ratingsCount }}
                      </p>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </div>
  </div>

  <v-dialog v-model="showReview" max-width="600px">
    <v-card max-width="400px" class="pa-4">
      <div class="d-flex justify-end pa-0">
        <v-icon @click="showReview = false">mdi-close</v-icon>
      </div>
      <p class="text-h6">{{ displayName }}</p>
      <v-divider class="my-2"></v-divider>
      <p>{{ userComment }}</p>
      <div class="my-1">
        <span>Rating: </span>
        <span style="font-size: 10px">
          <v-rating
            v-model="userRating"
            color="#5a5a5a"
            active-color="#e83e8c"
            empty-icon="mdi-cards-heart"
            full-icon="mdi-cards-heart"
            readonly
            hover
            size="16"
          />
        </span>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  data() {
    return {
      reviews: [],
      page: 1,
      itemsPerPage: 10,
      screenWidth: 0,
      showReview: false,
    };
  },
  methods: {
    hidereview(review) {
      this.displayName = review.user.name;
      this.userComment = review.comment;
      this.userRating = review.rating;
      this.showReview = true;
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
  async mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    const res = await api.get("/allreview/books/reviews/");
    this.reviews = res.data;
    if (this.reviews.length < 3) {
      router.push("/");
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.reviews.length / this.itemsPerPage);
    },
  },
};
</script>

<style scope>
.card-review {
  height: 230px;
  width: 100%;
  background-color: #f6f6f6;
}
.review-comment {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg-card {
  background-color: #f6f6f6;
}
.text-show-all {
  font-size: 16px;
  line-height: 1.5;
  color: #39b449;
  margin-bottom: 10px;
  cursor: pointer;
}
@media (max-width: 1200px) {
  .card-review {
    height: 230px;
    width: 80%;
    background-color: #f6f6f6;
  }
}
@media (max-width: 900px) {
  .card-review {
    height: 230px;
    width: 60%;
    background-color: #f6f6f6;
  }
}
</style>
