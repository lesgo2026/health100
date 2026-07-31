export async function onRequestGet(context) {
  const { env } = context;
  try {
    // 从 KV 读取数据，如果为空则给默认值
    const data = await env.MY_KV.get('userData');
    return new Response(data || JSON.stringify({ content: "初始数据，请编辑后同步。" }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    // 接收前端发来的新数据
    const body = await request.text();
    // 写入 KV
    await env.MY_KV.put('userData', body);
    return new Response(JSON.stringify({ success: true, message: '数据已同步到KV' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
