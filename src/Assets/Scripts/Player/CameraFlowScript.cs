using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFlowScript : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}

    public GameObject player;
    public float cameraHeight = -20.0f;
    private bool changeX = true;
    private bool changeY = true;
    void Update()
    {
        
    }

    private void FixedUpdate()
    {
        Vector3 pos = player.transform.position;

        if (pos.x <= -8.5 || pos.x >= 9.6)
        {
            changeX = false;
        }
        else
        {
            changeX = true;
        }

        if (pos.y >= 2 || pos.y <= -7)
        {
            changeY = false;
        }
        else
        {
            changeY = true;
        }

        
        pos.z += cameraHeight;
        if(!changeX)
        {
            pos.x = transform.position.x;
        }
        if(!changeY)
        {
            pos.y = transform.position.y;
        }

        transform.position = pos;
    }
}
