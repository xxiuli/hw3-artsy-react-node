// src/utils/dataProcess.js

// 清洗搜索结果的艺术家列表
const cleanSearchResult = (rawData) => {
  console.log(rawData)
  const cleaned = [];

  const items = rawData?._embedded?.results || [];

  for (const item of items) {
    if (item.type !== 'artist') continue;

    // 这次作业不再判断 item.type 是否为 "artist"
    const id = item?._links?.self?.href?.split("/").pop();
    const name = item?.title || "";
    let imageUrl = item?._links?.thumbnail?.href;

    // if (imageUrl === "/assets/shared/missing_image.png") {
    //   imageUrl = "";
    // }

    cleaned.push({ id, name, imageUrl });
  }

  return cleaned;
  };
  
// 清洗单个艺术家详情
const cleanArtistDetail= (rawData) => {
  const biographyRaw = rawData.biography || "";

  const cleanBiography = biographyRaw
    .replace(/-\s+/g, '')     // ✅ 去除断开的单词（如 Cub- ism → Cubism）
    .replace(/\n{2,}/g, '\n\n') // ✅ 保留段落间空行
    .replace(/[ \t]+\n/g, '\n') // ✅ 去掉每行结尾的多余空格
    .replace(/-\s*\n\s*/g, '') // 去除断词
    .replace(/\r\n/g, '\n').replace(/\r/g, '\n');// 可选：标准化换行符
  
  return {
    id: rawData.id,
    name: `${rawData.name}`,
    nationality: `${rawData.nationality}, ${rawData.birthday} - ${rawData.deathday || ''}` || "",
    biography: cleanBiography,
  };
};
  
// 清洗艺术家的作品
const cleanArtworks = (rawData) => {
  const cleaned = [];
  const items= rawData?._embedded?.artworks || [];

  for (const item of items) {
    const id = item?.id || "";
    const title = `${item?.title || ""}, ${item?.date || ""}`;
    const date = `${item?.date || ""}`;
    const titleModal = `${item?.title || ""}`;
    const imageUrl = item?._links?.thumbnail?.href || "";

    cleaned.push({ id, title, date, titleModal, imageUrl });
  }
  return cleaned;
};

//
const cleanSimilarArtist = (rawData) => {
  const cleaned = [];
  const items= rawData?._embedded?.artists || [];

  for (const item of items) {
    const id = item?.id || "";
    const name = item?.name || "";
    const imageUrl = item?._links?.thumbnail?.href || "";

    cleaned.push({ id, name, imageUrl });
  }
  return cleaned;
};
  
// 清洗作品对应的分类（基因）
const cleanGenes = (rawData) => {
  const cleaned = [];
  const items= rawData?._embedded?.genes || [];

  for (const item of items) {
    const id = item?.id || "";
    const name = item?.name || "";
    const imageUrl = item?._links?.thumbnail?.href || "";

    cleaned.push({ id, name, imageUrl });
  }
  return cleaned;
};

// 点击星星，发出请求,获取favourite artist的所有字段
const cleanFavoriteArtisInfo = (rawData) => {
  const cleaned = {
    id : `${rawData?.id}`|| "",
    name : `${rawData?.name}`|| "",
    imageUrl : `${rawData?._links?.thumbnail?.href }`|| "",
    nationality : `${rawData?.nationality}`|| "",
    birthDeathday : `${rawData?.birthday || ""} - ${rawData?.deathday || ""}`}
  return cleaned;
};


module.exports = {
  cleanSearchResult,
  cleanArtistDetail,
  cleanArtworks,
  cleanSimilarArtist,
  cleanGenes,
  cleanFavoriteArtisInfo,
};
  