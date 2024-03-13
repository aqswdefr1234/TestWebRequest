const fs = require('fs');

exports.handler = async function(event) {
    // 요청에서 파일 경로 가져오기
    const filePath = './storagefile';
    // 파일 읽기
    try {
        const fileData = fs.readFileSync(filePath);
        // 응답 객체 생성
        const response = {
            statusCode: 200,
            body: fileData.toString('base64'), // 바이너리 데이터를 base64로 인코딩하여 전송
            headers: {
                'Content-Type': 'application/octet-stream', // 이 헤더는 응답이 바이너리 데이터임을 나타냅니다.
                'Content-Disposition': 'attachment; filename="file.bin"' // 다운로드되는 파일의 이름을 지정합니다.
            }
        };
        return response;
    } catch (error) {
        // 파일을 찾을 수 없는 경우 또는 다른 오류 발생 시
        console.error(error);
        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'File not found' })
        };
    }
};

