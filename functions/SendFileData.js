const fs = require('fs');
function getSubDirectories(directory) {
    // 현재 디렉토리의 하위 항목을 읽어옵니다.
    const contents = fs.readdirSync(directory, { withFileTypes: true });
    // 하위 디렉토리를 저장할 배열을 초기화합니다.
    const subDirectories = [];

    // 디렉토리 내의 모든 항목을 반복하여 하위 디렉토리를 찾습니다.
    for (const item of contents) {
        // 디렉토리인지 확인합니다.
        if (item.isDirectory()) {
            // 현재 항목이 디렉토리인 경우, 하위 디렉토리의 이름을 배열에 추가합니다.
            subDirectories.push(item.name);
        }
    }

    return subDirectories;
}
exports.handler = async function(event) {
    // 요청에서 파일 경로 가져오기
    console.log("요청중");
    const currentDirectory = __dirname;
    const subDirectories = getSubDirectories(currentDirectory);
    console.log("Subdirectories in the current directory:", subDirectories);
    
    const filePath = './ksjmetaverseshop/storagefile';
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

