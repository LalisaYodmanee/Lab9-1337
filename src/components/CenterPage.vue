<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../main";
const now = new Date();
const time = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Bangkok', hour12: true });
const auth = getAuth();
const L_id = ref('');
const usm = ref('username');
const content = ref('');
var obj_content = {};
var contents = ref([]);
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        L_id.value = uid;
        //console.log(uid);
    } else {
        // User is signed out
        // ...
    }
});
const addContent = async () => {
    try {
        await addDoc(collection(db, "contents"), {
            id_post: L_id.value,
            username: usm.value,
            content: content.value,
            time: time
        });
        content.value = "";
        console.log(time);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    getDataContent();
}
const getDataUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().username}`);
        if (L_id.value == doc.id) {
            usm.value = doc.data().username;
        }
    });
}
const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().username}`);
        if (L_id.value == doc.id) {
            usm.value = doc.data().username;
        }
    });
}
const getDataContent = async () => {
    contents.value = [];
    const querySnapshot = await getDocs(query(collection(db, "contents"), orderBy("time", "desc")));
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data().content}`);
        //console.log(`${doc.id} => ${doc.data().time}`);
        obj_content = {
            uid: doc.id,
            time: doc.data().time,
            content: doc.data().content,
            username: doc.data().username,
        }
        contents.value.push(obj_content);
    });
}
const deleteContent = async (uid) => {
    await deleteDoc(doc(db, "contents", uid));
    getDataContent();
}
onMounted(() => {
    getDataUser();
    getDataContent();
    getData
});
</script>
<template>
    <div class="mt-2">
        <div class="border border-top-0 ps-2 py-3 ">
            <h4> Home </h4>
        </div>
        <div class="border border-top-0 pt-2 py-2">
            <div class="row">
                <div class="col-2 d-flex justify-content-center">
                    <img src="https://cdn.icon-icons.com/icons2/1182/PNG/96/1490129329-rounded38_82203.png" alt="demo" width="70"
                        height="70" />
                </div>
                <div class="col ">
                    <input class="tw w-100" type="text" placeholder="What are you thinking" v-model="content">
                    <div class="row pt-4">
                        <div class="col-1 d-flex justify-content-center">
                            <a href=""> <img src="https://cdn.icon-icons.com/icons2/3523/PNG/96/user_interface_gallery_multimedia_photo_ui_image_icon_221220.png" alt="add img"
                                    width="30" /></a>
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                            <a href=""><img src="https://cdn.icon-icons.com/icons2/3287/PNG/96/ok_emo_emoticon_emoji_icon_208281.png" alt="add emogi"
                                    width="30" /></a>
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                            <a href=""><img src="https://cdn.icon-icons.com/icons2/1948/PNG/96/free-30-instagram-stories-icons02_122549.png" alt="add emogi"
                                    width="30" /></a>
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                            <a href=""><img src="https://cdn.icon-icons.com/icons2/3523/PNG/96/user_interface_multimedia_video_ui_camera_icon_221206.png" alt="add emogi"
                                    width="30" /></a>
                        </div>
                        <div class="col"></div>
                        <div class="col">
                            <div class="d-flex justify-content-end pe-4">
                                <button class="btn btn-primary twb" @click="addContent()">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border border-top-0 pt-4 py-2" v-for="(value, key) in contents" :key="key">
            <div class="row">
                <div class="col-2 d-flex justify-content-center">
                    <img src="https://cdn.icon-icons.com/icons2/3523/PNG/96/user_interface_ui_avatar_profile_icon_221212.png" alt="demo" width="60"
                        height="60" />
                </div>
                <div class="col ">
                    <div class="row">
                        <div class="col">
                            <div class="">
                                <div>
                                    <h4>{{ value.username }}</h4>
                                </div>
                            </div>
                            <p>{{ value.content }}</p>
                        </div>
                        <div class="col-1" v-if="usm == value.username">
                            <a @click="deleteContent(value.uid)">
                                <img src="https://cdn.icon-icons.com/icons2/3523/PNG/96/user_interface_ui_trash_bin_recycle_delete_icon_221223.png" alt="delete" width="30"
                                    height="30" />
                            </a>
                        </div>
                    </div>
                    <div class="row pt-2">
                        <div class="col-1 d-flex justify-content-center">
                            <a href=""> <img src="https://cdn.icon-icons.com/icons2/2428/PNG/96/messenger_black_logo_icon_147108.png" alt="add img"
                                    width="30" /></a>
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                            <a href="">
                                <img src="https://cdn.icon-icons.com/icons2/3523/PNG/96/user_interface_favorites_like_heart_ui_love_icon_221231.png" alt="add emogi"
                                    width="30" />
                            </a>
                        </div>
                        <div class="col-1 d-flex justify-content-center">
                            <a href="">
                                <img src="https://cdn.icon-icons.com/icons2/789/PNG/96/like_icon-icons.com_65258.png" alt="add emogi"
                                    width="30" />
                            </a>
                        </div>
                        <div class="col"></div>
                        <div class="col d-flex justify-content-end  pe-5">
                            <div class="text-end">
                                <p style="font-size: 10px;">{{ value.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tw {
    height: 50px;
    font-size: 30px;
    background: transparent;
    border: 0;
    outline: 0;
    color: white;
}
.twb {
    border-radius: 50px;
    height: 50px;
    width: 100px;
}
</style>